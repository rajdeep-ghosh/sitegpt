'use client';

import { useState } from 'react';
import { CheckIcon, ChevronRightIcon, CopyIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const DEMO_ACCOUNT_EMAIL = 'demoaccount@gmail.com';
const DEMO_ACCOUNT_PASSWORD = 'demoaccount1234';

export default function DemoCredentials() {
  const [emailCopied, setEmailCopied] = useState(false);
  const [passwordCopied, setPasswordCopied] = useState(false);

  return (
    <Dialog>
      <DialogTrigger className='flex items-center text-sm text-muted-foreground underline decoration-dotted underline-offset-2'>
        <span>To try things out use these credentials</span>
        <ChevronRightIcon className='size-4' />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Demo credentials</DialogTitle>
          <DialogDescription>
            You can use these demo credentials to explore and test the features.
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='demo-email'>Email</Label>
            <div className='col-span-3 flex gap-2'>
              <Input id='demo-email' value={DEMO_ACCOUNT_EMAIL} readOnly />
              <Button
                size='icon'
                onClick={async () => {
                  setEmailCopied(true);
                  await navigator.clipboard.writeText(DEMO_ACCOUNT_EMAIL);
                  setTimeout(() => setEmailCopied(false), 2000);
                }}
              >
                {emailCopied ? <CheckIcon /> : <CopyIcon />}
              </Button>
            </div>
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='demo-password'>Password</Label>
            <div className='col-span-3 flex gap-2'>
              <Input
                id='demo-password'
                defaultValue={DEMO_ACCOUNT_PASSWORD}
                readOnly
              />
              <Button
                size='icon'
                onClick={async () => {
                  setPasswordCopied(true);
                  await navigator.clipboard.writeText(DEMO_ACCOUNT_PASSWORD);
                  setTimeout(() => setPasswordCopied(false), 2000);
                }}
              >
                {passwordCopied ? <CheckIcon /> : <CopyIcon />}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
