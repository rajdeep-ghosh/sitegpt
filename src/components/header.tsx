import Link from 'next/link';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type HeaderProps = React.HTMLAttributes<HTMLElement>;

export default function Header({ className, ...props }: HeaderProps) {
  return (
    <header className={cn('w-full p-4', className)} {...props}>
      <div className='flex items-center justify-between'>
        <Link href='/' className='font-clash-display text-lg font-medium'>
          SiteGPT
        </Link>
        <div className='space-x-2'>
          <Button variant='outline' size='sm' className='rounded-lg text-sm'>
            Sign In
          </Button>
          <Button size='sm' className='rounded-lg text-sm'>
            Sign Up
          </Button>
        </div>
      </div>
    </header>
  );
}
