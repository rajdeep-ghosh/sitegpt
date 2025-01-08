import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { desc, eq } from 'drizzle-orm';

import { createChatReqSchema } from '@/lib/api/schema';
import { db, kv } from '@/lib/db';
import { chatsTable } from '@/lib/db/schema';
import { ragChat } from '@/lib/rag';
import { ratelimit } from '@/lib/ratelimit';
import {
  escapeLink,
  extractSiteTitle,
  isHTML,
  validationErrorMessage
} from '@/lib/server-utils';

import type { NextRequest } from 'next/server';

// Allow this function to run for max 60 seconds
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json(
      { status: 'error', message: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const body = createChatReqSchema.safeParse(await req.json());

    if (!body.success) {
      const errMsg = validationErrorMessage(body.error.issues);
      return NextResponse.json(
        { status: 'error', message: errMsg },
        { status: 400 }
      );
    }

    const { limit, remaining, reset, success } =
      await ratelimit.chat.create.limit(userId);
    const ratelimitHeaders = {
      'RateLimit-Limit': limit.toString(),
      'RateLimit-Remaining': remaining.toString(),
      'RateLimit-Reset': reset.toString()
    };

    if (!success) {
      return NextResponse.json(
        { status: 'error', message: 'Rate limit exceeded' },
        { status: 429, headers: ratelimitHeaders }
      );
    }

    const isURLSupported = await isHTML(body.data.knowledge_src);
    if (!isURLSupported) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'The provided URL does not point to an HTML document'
        },
        { status: 415, headers: ratelimitHeaders }
      );
    }

    const isURLIndexed = await kv.sismember(
      'indexed_urls',
      body.data.knowledge_src
    );

    if (!isURLIndexed) {
      const { success } = await ragChat.context.add({
        type: 'html',
        source: body.data.knowledge_src,
        config: { chunkOverlap: 50, chunkSize: 200 },
        options: {
          namespace: escapeLink(body.data.knowledge_src),
          metadata: {
            source_url: body.data.knowledge_src
          }
        }
      });
      if (!success) throw new Error('Error adding context');

      await kv.sadd('indexed_urls', body.data.knowledge_src);
    }

    const siteTitle = await extractSiteTitle(body.data.knowledge_src);
    const [newChat] = await db
      .insert(chatsTable)
      .values({
        userId,
        siteTitle,
        siteUrl: body.data.knowledge_src
      })
      .returning();

    return NextResponse.json(
      { status: 'success', data: newChat },
      { status: 201, headers: ratelimitHeaders }
    );
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json(
        { status: 'error', message: err.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { status: 'error', message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json(
      { status: 'error', message: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const { limit, remaining, reset, success } =
      await ratelimit.chat.read.limit(userId);
    const ratelimitHeaders = {
      'RateLimit-Limit': limit.toString(),
      'RateLimit-Remaining': remaining.toString(),
      'RateLimit-Reset': reset.toString()
    };

    if (!success) {
      return NextResponse.json(
        { status: 'error', message: 'Rate limit exceeded' },
        { status: 429, headers: ratelimitHeaders }
      );
    }

    const chats = await db.query.chatsTable.findMany({
      where: eq(chatsTable.userId, userId),
      orderBy: [desc(chatsTable.createdAt)]
    });

    return NextResponse.json(
      { status: 'success', data: chats },
      { headers: ratelimitHeaders }
    );
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json(
        { status: 'error', message: err.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { status: 'error', message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
