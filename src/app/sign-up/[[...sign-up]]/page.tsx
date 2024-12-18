import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <main className='grid h-screen place-items-center'>
      <SignUp />
    </main>
  );
}
