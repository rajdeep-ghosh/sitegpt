'use client';

import { useEffect, useRef, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { ArrowUp } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

import AuthPopup from './auth-popup';

export default function URLInput() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [content, setContent] = useState('');
  const { userId } = useAuth();
  const [showAuthPopup, setShowAuthPopup] = useState(false);

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

  function handleSubmit() {
    if (!!userId === false) {
      setShowAuthPopup(true);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  }

  return (
    <div className='flex w-full max-w-xl gap-3 rounded-xl border-[0.5px] border-gray-400/25 bg-muted p-3 transition-colors duration-200 focus-within:border-gray-400/50 hover:border-gray-400/50'>
      <Textarea
        ref={textareaRef}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder='Enter a url...'
        className='max-h-60 min-h-20 resize-none overflow-hidden p-0 text-sm focus-visible:ring-0 md:text-base'
      />
      <Button
        size='icon'
        onClick={handleSubmit}
        className={cn('rounded-xl', {
          hidden: content.length === 0
        })}
      >
        <ArrowUp className='size-4' />
      </Button>

      <AuthPopup open={showAuthPopup} onOpenChange={setShowAuthPopup} />
    </div>
  );
}
