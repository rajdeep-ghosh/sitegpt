import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { mutate } from 'swr';

import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle
} from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';

import type { Chat } from '@/types';

type ChatRenameProps = {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  chat: Chat['data'];
};

export default function ChatRename({
  open,
  onOpenChange,
  chat
}: ChatRenameProps) {
  const isMobile = useIsMobile();

  const Comp = isMobile ? Drawer : Dialog;
  const CompContent = isMobile ? DrawerContent : DialogContent;
  const CompHeader = isMobile ? DrawerHeader : DialogHeader;
  const CompTitle = isMobile ? DrawerTitle : DialogTitle;
  const CompFooter = isMobile ? DrawerFooter : DialogFooter;

  const [title, setTitle] = useState(chat.siteTitle);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit() {
    try {
      setIsSubmitting(true);

      const updateChatRes = await fetch(`/api/chats/${chat.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ title })
      });
      const body = (await updateChatRes.json()) as
        | { status: 'error'; message: string }
        | Chat;

      switch (body.status) {
        case 'error':
          throw new Error(body.message);

        case 'success':
          onOpenChange(false);
          void mutate('/api/chats');
          toast({
            title: 'Success',
            description: 'Chat Renamed'
          });
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
    <Comp open={open} onOpenChange={onOpenChange}>
      <CompContent>
        <CompHeader>
          <CompTitle>Rename Chat</CompTitle>
        </CompHeader>
        <div className='p-4 md:p-0'>
          <label htmlFor='newChatTitle' className='sr-only'>
            New chat title
          </label>
          <Input
            id='newChatTitle'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <CompFooter>
          <Button
            size='sm'
            disabled={isSubmitting}
            onClick={handleSubmit}
            className='rounded-lg text-sm'
          >
            {isSubmitting ? <Loader2 className='animate-spin' /> : 'Save'}
          </Button>
        </CompFooter>
      </CompContent>
    </Comp>
  );
}
