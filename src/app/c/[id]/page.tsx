import { notFound } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';

import ChatContainer from '@/components/chat-container';
import ChatHeader from '@/components/chat-header';
import ChatProvider from '@/components/chat-provider';

import type { Message } from 'ai/react';
import type { Chat } from '@/types';

type ChatPageProps = {
  params: {
    id: string;
  };
};

export default async function ChatPage({ params }: ChatPageProps) {
  const { userId } = await auth();

  const chatRes = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/chats/${params.id}`,
    {
      headers: {
        'x-userid': userId!
      }
    }
  );
  if (!chatRes.ok) return notFound();

  const msgRes = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/chats/${params.id}/messages`,
    {
      headers: {
        'x-userid': userId!
      }
    }
  );
  if (!msgRes.ok) return notFound();

  const chat = (await chatRes.json()) as Extract<Chat, { status: 'success' }>;
  const messages = (await msgRes.json()) as {
    status: 'success';
    data: Message[];
  };

  return (
    <ChatProvider data={chat}>
      <ChatHeader />
      <ChatContainer initialMessages={messages.data} />
    </ChatProvider>
  );
}
