import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className='flex items-center justify-between p-4'>
      <Link href='/' className='font-clash-display text-lg font-medium'>
        SiteGPT
      </Link>
      <div className='space-x-2'>
        <Button variant='outline' className='rounded-lg p-0 px-3'>
          Sign In
        </Button>
        <Button className='rounded-lg p-0 px-3'>Sign Up</Button>
      </div>
    </header>
  );
}
