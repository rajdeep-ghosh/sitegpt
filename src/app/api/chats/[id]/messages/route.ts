import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { and, eq } from 'drizzle-orm';

import { db } from '@/lib/db';
import { chatsTable } from '@/lib/db/schema';
import { ragChat } from '@/lib/rag';
import { ratelimit } from '@/lib/ratelimit';

import type { NextRequest } from 'next/server';

type RouteProps = {
  params: {
    id: string;
  };
};

// Allow this function to run for max 25 seconds
export const maxDuration = 25;

export async function GET(req: NextRequest, { params }: RouteProps) {
  const { searchParams } = req.nextUrl;

  const { userId: _userId } = await auth();
  const userId = _userId ?? req.headers.get('x-userid');

  if (!userId) {
    return NextResponse.json(
      { status: 'error', message: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const { limit, remaining, reset, success } =
      await ratelimit.messages.limit(userId);
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

    const chat = await db.query.chatsTable.findFirst({
      where: and(eq(chatsTable.userId, userId), eq(chatsTable.id, params.id))
    });

    if (!chat) {
      return NextResponse.json(
        { status: 'error', message: 'Not Found' },
        { status: 404, headers: ratelimitHeaders }
      );
    }

    const amount = searchParams.get('limit');

    const messages = await ragChat.history.getMessages({
      sessionId: params.id,
      amount: amount ? parseInt(amount) : undefined
    });

    return NextResponse.json(
      { status: 'success', data: messages },
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
