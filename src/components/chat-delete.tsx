import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { mutate } from 'swr';
import useSWRMutation from 'swr/mutation';

import { deleteChat } from '@/lib/api/queries';
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
  chat: Extract<Chat, { status: 'success' }>;
};

export default function ChatDelete({
  open,
  onOpenChange,
  chat
}: ChatDeleteProps) {
  const isMobile = useIsMobile();
  const router = useRouter();

  const { trigger, isMutating } = useSWRMutation(
    `/api/chats/${chat.data.id}`,
    deleteChat,
    {
      onSuccess: () => {
        onOpenChange(false);
        router.replace('/');
        void mutate('/api/chats');
        toast({
          title: 'Success',
          description: 'Chat Deleted'
        });
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
    }
  );

  const Comp = isMobile ? Drawer : Dialog;
  const CompContent = isMobile ? DrawerContent : DialogContent;
  const CompHeader = isMobile ? DrawerHeader : DialogHeader;
  const CompTitle = isMobile ? DrawerTitle : DialogTitle;
  const CompDescription = isMobile ? DrawerDescription : DialogDescription;
  const CompFooter = isMobile ? DrawerFooter : DialogFooter;

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
            disabled={isMutating}
            onClick={() => trigger().catch(console.error)}
            className='rounded-lg text-sm'
          >
            {isMutating ? <Loader2 className='animate-spin' /> : 'Delete'}
          </Button>
        </CompFooter>
      </CompContent>
    </Comp>
  );
}
