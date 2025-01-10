'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { ArrowUp } from 'lucide-react';
import { mutate } from 'swr';
import useSWRMutation from 'swr/mutation';

import { createChat } from '@/lib/api/queries';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

import AuthPopup from './auth-popup';

export default function URLInput() {
  const router = useRouter();

  const { isSignedIn } = useAuth();
  const [showAuthPopup, setShowAuthPopup] = useState(false);

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

  const { trigger, isMutating } = useSWRMutation('/api/chats/', createChat, {
    onSuccess: (body) => {
      void mutate('/api/chats');
      router.push(`/c/${body.data.id}`);
    },
    onError: (err) => {
      console.error(err);
      const msg = err instanceof Error ? err.message : 'Please try again!';
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: msg
      });
    }
  });

  function handleSubmit() {
    if (!isSignedIn) {
      setShowAuthPopup(true);
      return;
    }

    trigger(content).catch(console.error);
  }

  return (
    <div className='flex w-full max-w-xl gap-3 rounded-xl border-[0.5px] border-gray-400/25 bg-muted p-3 transition-colors duration-200 focus-within:border-gray-400/50 hover:border-gray-400/50'>
      <label htmlFor='url-input' className='sr-only'>
        URL input
      </label>
      <Textarea
        id='url-input'
        ref={textareaRef}
        disabled={isMutating}
        value={content}
        placeholder='Enter a url to get started...'
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            if (content.length) handleSubmit();
          }
        }}
        className='max-h-60 min-h-20 resize-none overflow-hidden p-0 text-sm focus-visible:ring-0 disabled:cursor-wait md:text-base'
      />
      <Button
        size='icon'
        disabled={isMutating}
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
