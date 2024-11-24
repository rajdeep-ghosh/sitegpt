import { BackgroundLines } from '@/components/ui/background-lines';
import URLInput from '@/components/url-input';

export default function HomePage() {
  return (
    <main className='px-4'>
      <BackgroundLines className='absolute inset-0 -z-40 flex flex-col items-center justify-center gap-10 px-6'>
        <h1 className='font-sentient text-3xl font-medium sm:text-5xl'>
          Question the web
        </h1>
        <URLInput />
      </BackgroundLines>
    </main>
  );
}
