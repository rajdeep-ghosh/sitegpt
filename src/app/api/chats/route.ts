import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { generateErrorMessage } from 'zod-error';

import { createChatReqSchema } from '@/lib/api/schema/chats';
import db from '@/lib/db';
import { chatsTable, indexedUrlsTable } from '@/lib/db/schema';
import { ragChat } from '@/lib/rag';
import { extractSiteTitle, isHTML } from '@/lib/utils';

import type { NextRequest } from 'next/server';

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
      const errMsg = generateErrorMessage(body.error.issues, {
        maxErrors: 1,
        delimiter: { component: ': ' },
        code: { enabled: false },
        path: { enabled: true, type: 'objectNotation', label: '' },
        message: { enabled: true, label: '' }
      });
      return NextResponse.json(
        { status: 'error', message: errMsg },
        { status: 400 }
      );
    }

    const isURLSupported = await isHTML(body.data.knowledge_src);
    if (!isURLSupported) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'The provided URL does not point to an HTML document'
        },
        { status: 415 }
      );
    }

    const isURLIndexed = await db.query.indexedUrlsTable.findFirst({
      where: eq(indexedUrlsTable.url, body.data.knowledge_src),
      columns: { id: true }
    });

    if (!!isURLIndexed === false) {
      await ragChat.context.add({
        type: 'html',
        source: body.data.knowledge_src,
        config: { chunkOverlap: 50, chunkSize: 200 }
      });
      await db
        .insert(indexedUrlsTable)
        .values({ url: body.data.knowledge_src });
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
      { status: 201 }
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
