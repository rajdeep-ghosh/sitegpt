import Header from '@/components/header';

export default function NotFoundPage() {
  return (
    <>
      <Header className='absolute top-0' />
      <main>
        <div className='flex h-screen flex-col items-center justify-center text-center'>
          <div>
            <h1 className='mr-5 inline-block border-r border-white/30 pr-6 align-top text-2xl font-medium leading-[49px]'>
              404
            </h1>
            <div className='inline-block'>
              <h2 className='text-sm leading-[49px]'>
                This page could not be found.
              </h2>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
