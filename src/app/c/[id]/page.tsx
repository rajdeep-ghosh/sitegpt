import { notFound } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';

import ChatAction from '@/components/chat-action';
import Header from '@/components/header';

import type { Chat } from '@/types';

type ChatPageProps = {
  params: {
    id: string;
  };
};

export default async function ChatPage({ params }: ChatPageProps) {
  const { userId } = await auth();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/chats/${params.id}`,
    {
      headers: {
        'x-userid': userId!
      }
    }
  );
  if (!response.ok) return notFound();

  const { data: chat } = (await response.json()) as Chat;

  return (
    <>
      <Header className='sticky top-0 bg-background'>
        <div className='max-w-[60%] md:max-w-[50%]'>
          <h4 className='truncate text-sm font-medium'>{chat.siteTitle}</h4>
        </div>
        <ChatAction chat={chat} />
      </Header>
      <main className='mx-auto min-h-[calc(100dvh-60px)] max-w-2xl p-4'></main>
    </>
  );
}
