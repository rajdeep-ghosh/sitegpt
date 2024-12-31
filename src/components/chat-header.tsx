'use client';

import { useChatData } from '@/hooks/use-chat-data';

import ChatAction from './chat-action';
import Header from './header';

export default function ChatHeader() {
  const chat = useChatData();

  return (
    <Header className='sticky top-0 bg-background'>
      <div className='max-w-[60%] md:max-w-[50%]'>
        <h4 className='truncate text-sm font-medium'>{chat.data.siteTitle}</h4>
      </div>
      <ChatAction />
    </Header>
  );
}
