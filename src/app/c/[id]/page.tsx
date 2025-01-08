import { notFound } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';

import { env } from '@/lib/env';
import ChatContainer from '@/components/chat-container';
import ChatHeader from '@/components/chat-header';
import ChatProvider from '@/components/chat-provider';

import type { Chat, Messages } from '@/types';

type ChatPageProps = {
  params: {
    id: string;
  };
};

export default async function ChatPage({ params }: ChatPageProps) {
  const { userId } = await auth();

  const [chatRes, msgRes] = await Promise.all([
    fetch(`${env.NEXT_PUBLIC_URL}/api/chats/${params.id}`, {
      headers: {
        'x-userid': userId!
      }
    }),
    fetch(
      // TODO: temporarily set large limit to fetch all messages. fix later to use pagination
      `${env.NEXT_PUBLIC_URL}/api/chats/${params.id}/messages?limit=100`,
      {
        headers: {
          'x-userid': userId!
        }
      }
    )
  ]);

  if (!chatRes.ok || !msgRes.ok) return notFound();

  const chat = (await chatRes.json()) as Extract<Chat, { status: 'success' }>;
  const messages = (await msgRes.json()) as Extract<
    Messages,
    { status: 'success' }
  >;

  return (
    <ChatProvider data={chat}>
      <ChatHeader />
      <ChatContainer initialMessages={messages.data} />
    </ChatProvider>
  );
}
