import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { and, eq, sql } from 'drizzle-orm';

import { deleteChatReqSchema, updateChatReqSchema } from '@/lib/api/schema';
import db from '@/lib/db';
import { chatsTable } from '@/lib/db/schema';
import { validationErrorMessage } from '@/lib/server-utils';

import type { NextRequest } from 'next/server';

type RouteProps = {
  params: {
    id: string;
  };
};

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
    const chat = await db.query.chatsTable.findFirst({
      where: and(eq(chatsTable.userId, userId), eq(chatsTable.id, params.id))
    });

    if (!chat) {
      return NextResponse.json(
        { status: 'error', message: 'Not Found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ status: 'success', data: chat });
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

    const [updatedData] = await db
      .update(chatsTable)
      .set({ siteTitle: body.data.title, updatedAt: sql`NOW()` })
      .where(
        and(eq(chatsTable.userId, userId), eq(chatsTable.id, params.data.id))
      )
      .returning();

    return NextResponse.json({ status: 'success', data: updatedData });
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

    const [deletedData] = await db
      .delete(chatsTable)
      .where(
        and(eq(chatsTable.userId, userId), eq(chatsTable.id, params.data.id))
      )
      .returning({ id: chatsTable.id });

    return NextResponse.json({ status: 'success', data: deletedData });
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
