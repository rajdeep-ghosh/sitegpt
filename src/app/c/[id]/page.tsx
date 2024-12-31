import { notFound } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';

import ChatContainer from '@/components/chat-container';
import ChatHeader from '@/components/chat-header';
import ChatProvider from '@/components/chat-provider';

import type { Chat } from '@/types';

type ChatPageProps = {
  params: {
    id: string;
  };
};

export default async function ChatPage({ params }: ChatPageProps) {
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
    <ChatProvider data={chat}>
      <ChatHeader />
      <ChatContainer />
    </ChatProvider>
  );
}
