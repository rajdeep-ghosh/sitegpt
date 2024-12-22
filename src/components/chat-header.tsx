'use client';

import useSWR from 'swr';

import { getChat } from '@/lib/api/queries';

import ChatAction from './chat-action';
import Header from './header';

import type { Chat } from '@/types';

type ChatHeaderprops = {
  chat: Extract<Chat, { status: 'success' }>;
};

export default function ChatHeader({ chat: _chat }: ChatHeaderprops) {
  const { data: chat } = useSWR(`/api/chats/${_chat.data.id}`, getChat, {
    fallbackData: _chat
  });

  return (
    <Header className='sticky top-0 bg-background'>
      <div className='max-w-[60%] md:max-w-[50%]'>
        <h4 className='truncate text-sm font-medium'>{chat.data.siteTitle}</h4>
      </div>
      <ChatAction chat={chat} />
    </Header>
  );
}
