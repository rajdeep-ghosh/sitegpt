import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <main className='grid h-screen place-items-center'>
      <SignIn />
    </main>
  );
}
