import { useEffect, useRef } from 'react';
import { ArrowUpIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

import type { UseChatHelpers } from 'ai/react';

type ChatInputProps = {
  input: UseChatHelpers['input'];
  handleInputChange: UseChatHelpers['handleInputChange'];
  handleSubmit: UseChatHelpers['handleSubmit'];
};

export default function ChatInput({
  input,
  handleInputChange,
  handleSubmit
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    function adjustHeight() {
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    }
    adjustHeight();
  }, [input]);

  return (
    <div className='w-full rounded-2xl border-[0.5px] border-gray-400/25 bg-muted p-3 transition-colors duration-200 focus-within:border-gray-400/50 hover:border-gray-400/50'>
      <form onSubmit={handleSubmit}>
        <label htmlFor='chat-input' className='sr-only'>
          Chat input
        </label>
        <div className='flex items-end gap-2'>
          <Textarea
            id='chat-input'
            ref={textareaRef}
            value={input}
            placeholder='Ask a question'
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) handleSubmit();
            }}
            className='scrollbar max-h-36 min-h-8 resize-none overflow-y-auto px-0 py-1 focus-visible:ring-0 disabled:cursor-wait'
          />
          <Button
            type='submit'
            size='icon'
            className={cn('rounded-xl disabled:cursor-not-allowed', {
              hidden: input.length === 0
            })}
          >
            <ArrowUpIcon className='size-4' />
          </Button>
        </div>
      </form>
    </div>
  );
}
