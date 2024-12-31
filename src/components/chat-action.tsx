import { useState } from 'react';
import { Check, Ellipsis, Link, PenLine, Trash } from 'lucide-react';

import { useChatData } from '@/hooks/use-chat-data';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar';

import ChatDelete from './chat-delete';
import ChatRename from './chat-rename';

export default function ChatAction() {
  const chat = useChatData();

  const [copiedToClipboard, setCopiedToClipboard] = useState(false);
  const [openChatRename, setOpenChatRename] = useState(false);
  const [openChatDelete, setOpenChatDelete] = useState(false);

  return (
    <>
      <div className='flex items-center gap-2 text-sm'>
        <div className='hidden font-medium text-muted-foreground md:inline-block'>
          {new Date(chat.data.createdAt).toLocaleDateString('en', {
            month: 'short',
            day: 'numeric'
          })}
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant='ghost'
              size='icon'
              className='size-7 data-[state=open]:bg-accent'
            >
              <Ellipsis />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align='end'
            className='w-56 overflow-hidden rounded-lg p-0'
          >
            <Sidebar collapsible='none'>
              <SidebarContent>
                <SidebarGroup className='p-1.5'>
                  <SidebarGroupContent className='gap-0'>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          onClick={() => {
                            setCopiedToClipboard(true);
                            void navigator.clipboard.writeText(
                              chat.data.siteUrl
                            );
                            setTimeout(() => setCopiedToClipboard(false), 1500);
                          }}
                          className='[&>svg]:text-muted-foreground [&>svg]:transition-colors [&>svg]:[shape-rendering:crispEdges] [&>svg]:hover:text-current'
                        >
                          {copiedToClipboard ? <Check /> : <Link />}
                          <span>Copy Source Link</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          onClick={() => setOpenChatRename(true)}
                          className='[&>svg]:text-muted-foreground [&>svg]:transition-colors [&>svg]:[shape-rendering:crispEdges] [&>svg]:hover:text-current'
                        >
                          <PenLine />
                          <span>Rename</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          onClick={() => setOpenChatDelete(true)}
                          className='text-red-400 hover:bg-red-400/15 hover:text-red-400 active:bg-red-400/15 active:text-red-400 [&>svg]:text-red-400 [&>svg]:transition-colors [&>svg]:[shape-rendering:crispEdges] [&>svg]:hover:text-current'
                        >
                          <Trash />
                          <span>Delete</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>
            </Sidebar>
          </PopoverContent>
        </Popover>
      </div>
      <ChatRename open={openChatRename} onOpenChange={setOpenChatRename} />
      <ChatDelete open={openChatDelete} onOpenChange={setOpenChatDelete} />
    </>
  );
}
