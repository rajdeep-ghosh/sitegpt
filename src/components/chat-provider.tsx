'use client';

import { createContext } from 'react';
import useSWR from 'swr';

import { getChat } from '@/lib/api/queries';

import type { Chat } from '@/types';

type ChatProviderProps = {
  data: Extract<Chat, { status: 'success' }>;
  children: React.ReactNode;
};

export const ChatContext = createContext<ChatProviderProps['data'] | undefined>(
  undefined
);

export default function ChatProvider({ data, children }: ChatProviderProps) {
  const { data: chat } = useSWR(`/api/chats/${data.data.id}`, getChat, {
    fallbackData: data
  });

  return <ChatContext.Provider value={chat}>{children}</ChatContext.Provider>;
}
