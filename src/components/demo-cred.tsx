'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

const DEMO_ACCOUNT_EMAIL = 'demoaccount@gmail.com';
const DEMO_ACCOUNT_PASSWORD = 'demoaccount1234';

export default function DemoCredentials() {
  const [emailCopied, setEmailCopied] = useState(false);
  const [passwordCopied, setPasswordCopied] = useState(false);

  return (
    <div className='space-y-1.5 text-sm text-muted-foreground'>
      <h5>To try things out use these credentials:</h5>
      <div>
        <p className='flex items-center justify-between'>
          <span>Email:</span>
          <div className='flex items-center gap-1'>
            <span>{DEMO_ACCOUNT_EMAIL}</span>
            <div
              onClick={async () => {
                setEmailCopied(true);
                await navigator.clipboard.writeText(DEMO_ACCOUNT_EMAIL);
                setTimeout(() => setEmailCopied(false), 2000);
              }}
              className='cursor-pointer'
            >
              {emailCopied ? (
                <Check className='size-3.5' />
              ) : (
                <Copy className='size-3.5' />
              )}
            </div>
          </div>
        </p>
        <p className='flex items-center justify-between'>
          <span>Password:</span>
          <div className='flex items-center gap-1'>
            <span>{DEMO_ACCOUNT_PASSWORD}</span>
            <div
              onClick={async () => {
                setPasswordCopied(true);
                await navigator.clipboard.writeText(DEMO_ACCOUNT_PASSWORD);
                setTimeout(() => setPasswordCopied(false), 2000);
              }}
              className='cursor-pointer'
            >
              {passwordCopied ? (
                <Check className='size-3.5' />
              ) : (
                <Copy className='size-3.5' />
              )}
            </div>
          </div>
        </p>
      </div>
    </div>
  );
}
