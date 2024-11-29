import { SignIn } from '@clerk/nextjs';

export default function LoginPage() {
  return (
    <main className='grid h-screen place-items-center'>
      <SignIn />
    </main>
  );
}
