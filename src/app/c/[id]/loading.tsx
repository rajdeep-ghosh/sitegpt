import { Skeleton } from '@/components/ui/skeleton';
import Header from '@/components/header';

export default function ChatLoading() {
  return (
    <>
      <Header>
        <Skeleton className='h-5 w-full max-w-[60%] rounded md:max-w-[50%]' />
        <Skeleton className='h-5 w-6 md:w-20' />
      </Header>
      <div className='mx-auto h-[calc(100dvh-60px)] max-w-2xl p-2'>
        <div className='grid h-full place-items-end px-4'>
          <Skeleton className='mb-5 h-20 w-full rounded-2xl' />
        </div>
      </div>
    </>
  );
}
