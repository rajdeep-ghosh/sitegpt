import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { mutate } from 'swr';
import useSWRMutation from 'swr/mutation';

import { updateChat } from '@/lib/api/queries';
import { useChatData } from '@/hooks/use-chat-data';
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

type ChatRenameProps = {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ChatRename({ open, onOpenChange }: ChatRenameProps) {
  const isMobile = useIsMobile();
  const chat = useChatData();

  const [title, setTitle] = useState(chat.data.siteTitle);

  const { trigger, isMutating } = useSWRMutation(
    `/api/chats/${chat.data.id}`,
    updateChat,
    {
      onSuccess: () => {
        void mutate('/api/chats');
        onOpenChange(false);
        toast({
          title: 'Success',
          description: 'Chat Renamed'
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
  const CompFooter = isMobile ? DrawerFooter : DialogFooter;

  return (
    <Comp open={open} onOpenChange={onOpenChange}>
      <CompContent>
        <CompHeader>
          <CompTitle>Rename Chat</CompTitle>
        </CompHeader>
        <div className='p-4 md:p-0'>
          <label htmlFor='new-chat-title' className='sr-only'>
            New chat title
          </label>
          <Input
            id='new-chat-title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <CompFooter>
          <Button
            size='sm'
            disabled={isMutating}
            onClick={() => trigger(title).catch(console.error)}
            className='rounded-lg text-sm'
          >
            {isMutating ? <Loader2 className='animate-spin' /> : 'Save'}
          </Button>
        </CompFooter>
      </CompContent>
    </Comp>
  );
}
