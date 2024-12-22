import { notFound } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';

import ChatHeader from '@/components/chat-header';

import type { Chat } from '@/types';

type ChatLayoutProps = {
  params: {
    id: string;
  };
  children: React.ReactNode;
};

export default async function ChatLayout({
  params,
  children
}: ChatLayoutProps) {
  const { userId } = await auth();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/chats/${params.id}`,
    {
      headers: {
        'x-userid': userId!
      }
    }
  );
  if (!res.ok) return notFound();

  const chat = (await res.json()) as Extract<Chat, { status: 'success' }>;

  return (
    <>
      <ChatHeader chat={chat} />
      {children}
    </>
  );
}
