'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUp } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export default function ChatInput() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [content, setContent] = useState('');

  useEffect(() => {
    function adjustHeight() {
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    }
    adjustHeight();
  }, [content]);

  return (
    <div className='w-full rounded-2xl border-[0.5px] border-gray-400/25 bg-muted p-3 transition-colors duration-200 focus-within:border-gray-400/50 hover:border-gray-400/50'>
      <label htmlFor='chat-input' className='sr-only'>
        Chat input
      </label>
      <div className='flex items-end gap-2'>
        <Textarea
          id='chat-input'
          ref={textareaRef}
          value={content}
          placeholder='Ask a question'
          onChange={(e) => setContent(e.target.value)}
          className='scrollbar max-h-36 min-h-8 resize-none overflow-y-auto px-0 py-1 focus-visible:ring-0 disabled:cursor-wait'
        />
        <Button
          size='icon'
          className={cn('rounded-xl disabled:cursor-not-allowed', {
            hidden: content.length === 0
          })}
        >
          <ArrowUp className='size-4' />
        </Button>
      </div>
    </div>
  );
}
