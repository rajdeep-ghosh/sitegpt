import { SignIn } from '@clerk/nextjs';

import DemoCredentials from '@/components/demo-cred';
import Header from '@/components/header';

export default function SignInPage() {
  return (
    <>
      <Header className='absolute top-0' />
      <main className='flex h-screen flex-col items-center justify-center gap-8'>
        <div className='pt-20'>
          <SignIn />
        </div>
        <DemoCredentials />
      </main>
    </>
  );
}
