'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useClerk, useUser } from '@clerk/nextjs';
import { Avatar } from '@radix-ui/react-avatar';
import {
  ChevronsUpDown,
  Loader,
  LogOut,
  MessageCirclePlus,
  Settings
} from 'lucide-react';
import useSWR from 'swr';

import { getChats } from '@/lib/api/queries';
import { useIsMobile } from '@/hooks/use-mobile';
import { AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
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
  const pathname = usePathname();
  const isMobile = useIsMobile();

  const { user } = useUser();
  const { openUserProfile, signOut } = useClerk();

  const { data: chats, isLoading } = useSWR('/api/chats', getChats);

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
              <SidebarTrigger
                icon={isMobile ? 'x' : 'panel'}
                className='group-data-[state=collapsed]:hidden'
              />
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
      <SidebarContent className='scrollbar'>
        <SidebarGroup className='group-data-[collapsible=icon]:hidden'>
          {isLoading ? (
            <Loader className='mt-3 size-4 w-full animate-spin text-red-50' />
          ) : !chats ? (
            <div className='mt-2 text-center'>
              <span className='text-sm font-extralight italic'>
                Unable to load history
              </span>
            </div>
          ) : (
            <>
              <SidebarGroupLabel>Recents</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className='gap-1.5'>
                  {chats.data.length > 0 ? (
                    chats.data.map((chat) => (
                      <SidebarMenuItem key={chat.id}>
                        <SidebarMenuButton
                          isActive={chat.id === pathname.split('/').pop()}
                          asChild
                        >
                          <Link href={`/c/${chat.id}`} title={chat.siteTitle}>
                            <span>{chat.siteTitle}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))
                  ) : (
                    <div className='mt-3 text-center'>
                      <span className='fon text-xs text-muted-foreground'>
                        No chats yet. Start a convo!
                      </span>
                    </div>
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            </>
          )}
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size='lg' tooltip='Profile'>
                  <Avatar className='size-8'>
                    <AvatarImage
                      src={user?.imageUrl}
                      alt={user?.fullName ?? 'avatar'}
                      className='rounded'
                    />
                    <AvatarFallback className='rounded uppercase'>
                      {`${user?.firstName?.charAt(0)}${user?.lastName?.charAt(0)}`}
                    </AvatarFallback>
                  </Avatar>
                  <div className='grid flex-1 text-left text-sm leading-tight group-data-[state=collapsed]:hidden'>
                    <span className='truncate font-semibold'>
                      {user?.fullName}
                    </span>
                    <span className='truncate text-xs'>
                      {user?.primaryEmailAddress?.emailAddress}
                    </span>
                  </div>
                  <ChevronsUpDown className='ml-auto size-4 group-data-[state=collapsed]:hidden' />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
                side={isMobile ? 'bottom' : 'right'}
                align='end'
                sideOffset={4}
              >
                <DropdownMenuLabel className='p-0 font-normal'>
                  <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                    <Avatar className='size-8'>
                      <AvatarImage
                        src={user?.imageUrl}
                        alt={user?.fullName ?? 'avatar'}
                        className='rounded'
                      />
                      <AvatarFallback className='rounded uppercase'>
                        {`${user?.firstName?.charAt(0)}${user?.lastName?.charAt(0)}`}
                      </AvatarFallback>
                    </Avatar>
                    <div className='grid flex-1 text-left text-sm leading-tight'>
                      <span className='truncate font-semibold'>
                        {user?.fullName}
                      </span>
                      <span className='truncate text-xs'>
                        {user?.primaryEmailAddress?.emailAddress}
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onClick={() => openUserProfile()}
                    className='cursor-pointer'
                  >
                    <Settings />
                    Manage Account
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => signOut()}
                    className='cursor-pointer'
                  >
                    <LogOut />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
