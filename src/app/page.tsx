import Link from 'next/link';
import { ChevronRightIcon, GithubIcon } from 'lucide-react';

import { AnimatedGradientText } from '@/components/ui/animated-gradient-text';
import { BackgroundLines } from '@/components/ui/background-lines';
import Footer from '@/components/footer';
import Header from '@/components/header';
import URLInput from '@/components/url-input';

export default function HomePage() {
  return (
    <>
      <Header className='absolute top-0' />
      <BackgroundLines className='absolute inset-0 -z-50' />
      <main className='px-4'>
        <div className='-mt-5 flex h-screen flex-col items-center justify-center gap-10'>
          <Link href='https://github.com/rajdeep-ghosh/sitegpt' target='_blank'>
            <AnimatedGradientText>
              <GithubIcon className='size-4' />
              <span className='ml-2 inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent'>
                Star on Github
              </span>
              <ChevronRightIcon className='ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5' />
            </AnimatedGradientText>
          </Link>
          <h1 className='font-sentient text-3xl font-medium sm:text-5xl'>
            Question the web
          </h1>
          <URLInput />
        </div>
      </main>
      <Footer />
    </>
  );
}
