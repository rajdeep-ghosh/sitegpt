'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Avatar } from '@radix-ui/react-avatar';
import { ChevronsUpDown, MessageCirclePlus } from 'lucide-react';

import { useIsMobile } from '@/hooks/use-mobile';
import { AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger
} from '@/components/ui/sidebar';

export default function AppSidebar() {
  const isMobile = useIsMobile();

  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader className='pt-5'>
        <SidebarMenu className='gap-4'>
          <SidebarMenuItem>
            <div className='flex items-center justify-between gap-2 group-data-[state=collapsed]:justify-center group-data-[state=expanded]:px-2'>
              <Image
                src='/favicon.svg'
                alt='Logo'
                width={24}
                height={24}
                className='size-6'
              />
              <SidebarTrigger className='group-data-[state=collapsed]:hidden' />
            </div>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              variant='outline'
              asChild
              tooltip='New Chat'
              className='font-medium group-data-[state=expanded]:justify-center'
            >
              <Link href='/'>
                <MessageCirclePlus className='size-4' />
                <span>New Chat</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className='group-data-[collapsible=icon]:hidden'>
          <SidebarGroupLabel>Recents</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>Chat 1</SidebarMenuButton>
                <SidebarMenuButton>Chat 2</SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu className='gap-4'>
          <SidebarMenuItem>
            {!isMobile && (
              <SidebarMenuButton
                asChild
                tooltip='Toggle Sidebar'
                className='group-data-[state=expanded]:hidden'
              >
                <SidebarTrigger />
              </SidebarMenuButton>
            )}
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton size='lg' tooltip='Profile'>
              <Avatar className='size-8 rounded-lg'>
                <AvatarImage src='' alt='' />
                <AvatarFallback className='rounded-lg'>RG</AvatarFallback>
              </Avatar>
              <div className='grid flex-1 text-left text-sm leading-tight group-data-[state=collapsed]:hidden'>
                <span className='truncate font-semibold'>Rajdeep Ghosh</span>
                <span className='truncate text-xs'>rajdeep@air.com</span>
              </div>
              <ChevronsUpDown className='ml-auto size-4 group-data-[state=collapsed]:hidden' />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
