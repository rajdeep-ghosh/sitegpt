import Link from 'next/link';
import { SignedOut } from '@clerk/nextjs';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type HeaderProps = React.HTMLAttributes<HTMLElement>;

export default function Header({ className, children, ...props }: HeaderProps) {
  return (
    <header className={cn('w-full p-4', className)} {...props}>
      <nav className='flex items-center justify-between'>
        <Link href='/' className='font-clash-display text-lg font-medium'>
          SiteGPT
        </Link>
        {children}
        <SignedOut>
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
        </SignedOut>
      </nav>
    </header>
  );
}
