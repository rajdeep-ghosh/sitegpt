import Link from 'next/link';

export default function Footer() {
  return (
    <footer className='absolute bottom-0 w-full p-2 px-4 text-center text-xs text-muted-foreground'>
      made with ❤️ by{' '}
      <Link
        href='https://x.com/rajdeepghosh__'
        target='_blank'
        className='font-mono'
      >
        @rajdeepghosh__
      </Link>
    </footer>
  );
}
