import { SignUp } from '@clerk/nextjs';

import Header from '@/components/header';

export default function SignUpPage() {
  return (
    <>
      <Header className='absolute top-0' />
      <main className='grid h-screen place-items-center'>
        <SignUp />
      </main>
    </>
  );
}
