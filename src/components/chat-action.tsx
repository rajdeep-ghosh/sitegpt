'use client';

import { useState } from 'react';
import { Check, Ellipsis, Link } from 'lucide-react';

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

import type { Chat } from '@/types';

type ChatActionProps = {
  chat: Chat['data'];
};

export default function ChatAction({ chat }: ChatActionProps) {
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);

  return (
    <div className='flex items-center gap-2 text-sm'>
      <div className='hidden font-medium text-muted-foreground md:inline-block'>
        {new Date(chat.createdAt).toLocaleDateString('en', {
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
                          void navigator.clipboard.writeText(chat.siteUrl);
                          setTimeout(() => setCopiedToClipboard(false), 1500);
                        }}
                        className='[&>svg]:text-muted-foreground [&>svg]:transition-colors [&>svg]:[shape-rendering:crispEdges] [&>svg]:hover:text-current'
                      >
                        {copiedToClipboard ? <Check /> : <Link />}
                        <span>Copy Source Link</span>
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
  );
}
