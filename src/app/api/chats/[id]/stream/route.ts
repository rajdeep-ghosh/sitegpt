import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { aiUseChatAdapter } from '@upstash/rag-chat/nextjs';

import { useChatReqSchema } from '@/lib/api/schema';
import { ragChat } from '@/lib/rag';
import { ratelimit } from '@/lib/ratelimit';
import { escapeLink, validationErrorMessage } from '@/lib/server-utils';

import type { Message } from 'ai/react';
import type { NextRequest } from 'next/server';

type RouteProps = {
  params: {
    id: string;
  };
};

// Allow this function to run for max 60 seconds
export const maxDuration = 60;

export async function POST(req: NextRequest, { params: _params }: RouteProps) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json(
      { status: 'error', message: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const params = useChatReqSchema.safeParse(_params);
    const body = (await req.json()) as {
      messages: Message[];
      namespace: string;
    };

    if (!params.success) {
      const errMsg = validationErrorMessage(params.error.issues);
      return NextResponse.json(
        { status: 'error', message: errMsg },
        { status: 400 }
      );
    }

    const question = body.messages.at(-1)?.content;

    if (!question) {
      return NextResponse.json(
        { status: 'error', message: 'Invalid Body' },
        { status: 400 }
      );
    }

    const { limit, remaining, reset, success } =
      await ratelimit.stream.limit(userId);
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

    const response = await ragChat.chat(question, {
      sessionId: params.data.id,
      namespace: escapeLink(body.namespace),
      streaming: true
    });

    return aiUseChatAdapter(response);
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
