'use client';

import Link from 'next/link';
import { useAuth } from '@clerk/nextjs';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';

type HeaderProps = React.HTMLAttributes<HTMLElement>;

export default function Header({ className, children, ...props }: HeaderProps) {
  const { isSignedIn } = useAuth();

  return (
    <header className={cn('w-full p-4', className)} {...props}>
      <nav className='flex items-center justify-between'>
        {isSignedIn && <SidebarTrigger icon='align' className='md:hidden' />}
        <Link
          href='/'
          className={cn('font-clash-display text-lg font-medium', {
            'hidden md:block': isSignedIn
          })}
        >
          SiteGPT
        </Link>
        {children}
        {!isSignedIn && (
          <div className='space-x-2'>
            <Button
              variant='outline'
              size='sm'
              asChild
              className='rounded-lg text-sm'
            >
              <Link href='/sign-in'>Sign In</Link>
            </Button>
            <Button size='sm' asChild className='rounded-lg text-sm'>
              <Link href='/sign-up'>Sign Up</Link>
            </Button>
          </div>
        )}
      </nav>
    </header>
  );
}
