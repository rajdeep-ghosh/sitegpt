import { SignIn } from '@clerk/nextjs';

import Header from '@/components/header';

export default function SignInPage() {
  return (
    <>
      <Header className='absolute top-0' />
      <main className='grid h-screen place-items-center'>
        <SignIn />
      </main>
    </>
  );
}
