import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { and, eq, sql } from 'drizzle-orm';

import { deleteChatReqSchema, updateChatReqSchema } from '@/lib/api/schema';
import db from '@/lib/db';
import { chatsTable } from '@/lib/db/schema';
import { ratelimit } from '@/lib/ratelimit';
import { validationErrorMessage } from '@/lib/server-utils';

import type { NextRequest } from 'next/server';

type RouteProps = {
  params: {
    id: string;
  };
};

// Allow this function to run for max 25 seconds
export const maxDuration = 25;

export async function GET(req: NextRequest, { params }: RouteProps) {
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

    const chat = await db.query.chatsTable.findFirst({
      where: and(eq(chatsTable.userId, userId), eq(chatsTable.id, params.id))
    });

    if (!chat) {
      return NextResponse.json(
        { status: 'error', message: 'Not Found' },
        { status: 404, headers: ratelimitHeaders }
      );
    }

    return NextResponse.json(
      { status: 'success', data: chat },
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

export async function PATCH(req: NextRequest, { params: _params }: RouteProps) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json(
      { status: 'error', message: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const params = updateChatReqSchema.params.safeParse(_params);
    const body = updateChatReqSchema.body.safeParse(await req.json());

    if (!params.success) {
      const errMsg = validationErrorMessage(params.error.issues);
      return NextResponse.json(
        { status: 'error', message: errMsg },
        { status: 400 }
      );
    }

    if (!body.success) {
      const errMsg = validationErrorMessage(body.error.issues);
      return NextResponse.json(
        { status: 'error', message: errMsg },
        { status: 400 }
      );
    }

    const { limit, remaining, reset, success } =
      await ratelimit.chat.update.limit(userId);
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

    const [updatedData] = await db
      .update(chatsTable)
      .set({ siteTitle: body.data.title, updatedAt: sql`NOW()` })
      .where(
        and(eq(chatsTable.userId, userId), eq(chatsTable.id, params.data.id))
      )
      .returning();

    return NextResponse.json(
      { status: 'success', data: updatedData },
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

export async function DELETE(
  _req: NextRequest,
  { params: _params }: RouteProps
) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json(
      { status: 'error', message: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const params = deleteChatReqSchema.safeParse(_params);

    if (!params.success) {
      const errMsg = validationErrorMessage(params.error.issues);
      return NextResponse.json(
        { status: 'error', message: errMsg },
        { status: 400 }
      );
    }

    const { limit, remaining, reset, success } =
      await ratelimit.chat.delete.limit(userId);
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

    const [deletedData] = await db
      .delete(chatsTable)
      .where(
        and(eq(chatsTable.userId, userId), eq(chatsTable.id, params.data.id))
      )
      .returning({ id: chatsTable.id });

    return NextResponse.json(
      { status: 'success', data: deletedData },
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
