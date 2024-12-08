import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';

import db from '@/lib/db';
import { indexedUrlsTable } from '@/lib/db/schema';
import { ragChat } from '@/lib/rag-chat';

import type { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { knowledge_src: string };

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
