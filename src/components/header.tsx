import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className='flex items-center justify-between p-4'>
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
    </header>
  );
}
