'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { ArrowUp } from 'lucide-react';
import { mutate } from 'swr';

import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

import AuthPopup from './auth-popup';

import type { Chat } from '@/types';

export default function URLInput() {
  const router = useRouter();

  const { isSignedIn } = useAuth();
  const [showAuthPopup, setShowAuthPopup] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  async function handleSubmit() {
    if (!isSignedIn) {
      setShowAuthPopup(true);
      return;
    }

    try {
      setIsSubmitting(true);

      const createChatRes = await fetch('/api/chats', {
        method: 'POST',
        body: JSON.stringify({
          knowledge_src: content
        })
      });
      const body = (await createChatRes.json()) as Chat;

      switch (body.status) {
        case 'error':
          throw new Error(body.message);

        case 'success':
          void mutate('/api/chats');
          router.push(`/c/${body.data.id}`);
      }
    } catch (err) {
      if (err instanceof Error) {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: err.message
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: 'Please try again!'
        });
      }
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className='flex w-full max-w-xl gap-3 rounded-xl border-[0.5px] border-gray-400/25 bg-muted p-3 transition-colors duration-200 focus-within:border-gray-400/50 hover:border-gray-400/50'>
      <Textarea
        ref={textareaRef}
        disabled={isSubmitting}
        value={content}
        placeholder='Enter a url...'
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={async (e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            if (content.length) await handleSubmit();
          }
        }}
        className='max-h-60 min-h-20 resize-none overflow-hidden p-0 text-sm focus-visible:ring-0 disabled:cursor-wait md:text-base'
      />
      <Button
        size='icon'
        disabled={isSubmitting}
        onClick={handleSubmit}
        className={cn('rounded-xl disabled:cursor-not-allowed', {
          hidden: content.length === 0
        })}
      >
        <ArrowUp className='size-4' />
      </Button>

      <AuthPopup open={showAuthPopup} onOpenChange={setShowAuthPopup} />
    </div>
  );
}
