'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUp } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export default function URLInput() {
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
    <div className='flex w-full max-w-xl gap-3 rounded-xl border-[0.5px] border-gray-400/25 bg-muted p-3 transition-colors duration-200 focus-within:border-gray-400/50 hover:border-gray-400/50'>
      <Textarea
        ref={textareaRef}
        onChange={(e) => setContent(e.target.value)}
        placeholder='Enter a url...'
        className='max-h-60 min-h-20 resize-none overflow-hidden p-0 text-sm focus-visible:ring-0 md:text-base'
      />
      <Button
        size='icon'
        className={cn('rounded-xl', {
          hidden: content.length === 0
        })}
      >
        <ArrowUp className='size-4' />
      </Button>
    </div>
  );
}
