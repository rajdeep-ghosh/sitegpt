import ChatInput from '@/components/chat-input';
import ChatMessage from '@/components/chat-message';

export default function ChatPage() {
  return (
    <main className='mx-auto h-[calc(100dvh-60px)] max-w-2xl p-2'>
      <div className='flex h-full flex-col justify-between gap-4 px-4'>
        <div className='scrollbar grow space-y-4 overflow-y-auto pr-1'>
          <ChatMessage />
          <ChatMessage />
          <ChatMessage />
          <ChatMessage />
          <ChatMessage />
        </div>
        <div className='flex flex-col items-center gap-2'>
          <ChatInput />
          <p className='text-center text-xs text-muted-foreground'>
            SiteGPT can make mistakes. Check important info.
          </p>
        </div>
      </div>
    </main>
  );
}
