import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { mutate } from 'swr';

import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle
} from '@/components/ui/drawer';

import type { Chat } from '@/types';

type ChatDeleteProps = {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  chat: Chat['data'];
};

export default function ChatDelete({
  open,
  onOpenChange,
  chat
}: ChatDeleteProps) {
  const isMobile = useIsMobile();

  const router = useRouter();

  const Comp = isMobile ? Drawer : Dialog;
  const CompContent = isMobile ? DrawerContent : DialogContent;
  const CompHeader = isMobile ? DrawerHeader : DialogHeader;
  const CompTitle = isMobile ? DrawerTitle : DialogTitle;
  const CompDescription = isMobile ? DrawerDescription : DialogDescription;
  const CompFooter = isMobile ? DrawerFooter : DialogFooter;

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit() {
    try {
      setIsSubmitting(true);

      const deleteChatRes = await fetch(`/api/chats/${chat.id}`, {
        method: 'DELETE'
      });
      const body = (await deleteChatRes.json()) as
        | { status: 'error'; message: string }
        | Chat;

      switch (body.status) {
        case 'error':
          throw new Error(body.message);

        case 'success':
          onOpenChange(false);
          router.replace('/');
          void mutate('/api/chats');
          toast({
            title: 'Success',
            description: 'Chat Deleted'
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
        <CompHeader className='space-y-3'>
          <CompTitle>Delete Chat?</CompTitle>
          <CompDescription>
            The chat will be deleted and removed from your chat history. This
            action cannot be undone.
          </CompDescription>
        </CompHeader>
        <CompFooter>
          <Button
            variant='destructive'
            size='sm'
            disabled={isSubmitting}
            onClick={handleSubmit}
            className='rounded-lg text-sm'
          >
            {isSubmitting ? <Loader2 className='animate-spin' /> : 'Delete'}
          </Button>
        </CompFooter>
      </CompContent>
    </Comp>
  );
}
