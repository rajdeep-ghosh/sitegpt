import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';

import db from '@/lib/db';
import { indexedUrlsTable } from '@/lib/db/schema';
import { ragChat } from '@/lib/rag';
import { isHTML } from '@/lib/utils';

import type { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json('Unauthorized', { status: 401 });
  }

  try {
    const body = (await req.json()) as { knowledge_src: string };

    const isURLSupported = await isHTML(body.knowledge_src);
    if (!isURLSupported) {
      return NextResponse.json(
        'The provided URL does not point to an HTML document',
        { status: 400 }
      );
    }

    const isURLIndexed = await db.query.indexedUrlsTable.findFirst({
      where: eq(indexedUrlsTable.url, body.knowledge_src),
      columns: { id: true }
    });

    if (!!isURLIndexed === false) {
      await ragChat.context.add({
        type: 'html',
        source: body.knowledge_src,
        config: { chunkOverlap: 50, chunkSize: 200 }
      });

      await db.insert(indexedUrlsTable).values({ url: body.knowledge_src });
    }

    return NextResponse.json('ok');
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json(err.message, { status: 500 });
    }
    return NextResponse.json('Internal Server Error', { status: 500 });
  }
}
