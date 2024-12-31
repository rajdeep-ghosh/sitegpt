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
        <div className='flex h-screen flex-col items-center justify-center gap-10'>
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
