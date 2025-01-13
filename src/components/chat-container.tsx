'use client';

import { useChat } from 'ai/react';

import { useChatData } from '@/hooks/use-chat-data';

import ChatGreeting from './chat-greeting';
import ChatInput from './chat-input';
import ChatMessage from './chat-message';

import type { Message } from 'ai/react';

type ChatContainerProps = {
  initialMessages: Message[];
};

export default function ChatContainer({ initialMessages }: ChatContainerProps) {
  const chat = useChatData();

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: `/api/chats/${chat.data.id}/stream`,
    body: { namespace: chat.data.siteUrl },
    initialMessages
  });

  return (
    <main className='h-[calc(100dvh-60px)] py-2'>
      <div className='flex h-full flex-col justify-between gap-4'>
        <div className='scrollbar grow overflow-y-auto'>
          <div className='mx-auto h-full max-w-2xl space-y-4 px-6'>
            {messages.length > 0 ? (
              messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))
            ) : (
              <ChatGreeting />
            )}
          </div>
        </div>
        <div className='mx-auto w-full max-w-2xl px-4'>
          <div className='flex flex-col items-center gap-2'>
            <ChatInput
              input={input}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
            />
            <p className='text-center text-xs text-muted-foreground'>
              SiteGPT can make mistakes. Check important info.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
