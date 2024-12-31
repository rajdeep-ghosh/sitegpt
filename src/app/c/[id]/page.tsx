'use client';

import { useChat } from 'ai/react';

import { useChatData } from '@/hooks/use-chat-data';
import ChatGreeting from '@/components/chat-greeting';
import ChatInput from '@/components/chat-input';
import ChatMessage from '@/components/chat-message';

type ChatPageProps = {
  params: {
    id: string;
  };
};

export default function ChatPage({ params }: ChatPageProps) {
  const chat = useChatData();

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: `/api/chats/${params.id}/stream`,
    body: { namespace: chat.data.siteUrl }
  });

  return (
    <main className='mx-auto h-[calc(100dvh-60px)] max-w-2xl p-2'>
      <div className='flex h-full flex-col justify-between gap-4 px-4'>
        <div className='scrollbar grow space-y-4 overflow-y-auto pr-1'>
          {messages.length > 0 ? (
            messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))
          ) : (
            <ChatGreeting />
          )}
        </div>
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
    </main>
  );
}
