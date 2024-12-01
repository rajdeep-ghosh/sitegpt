import Link from 'next/link';
import { Lock } from 'lucide-react';

import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Drawer, DrawerContent } from '@/components/ui/drawer';

type AuthPopupProps = {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AuthPopup({ open, onOpenChange }: AuthPopupProps) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent>
          <AuthPopupContent />
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <AuthPopupContent />
      </DialogContent>
    </Dialog>
  );
}

function AuthPopupContent() {
  return (
    <div className='flex flex-col gap-6 p-4 py-6 md:p-0'>
      <div className='flex flex-col items-center justify-center gap-5'>
        <Lock className='size-12 text-center' />
        <div className='text-center'>
          <h3 className='pb-1 text-lg font-semibold md:text-xl'>
            Login to continue
          </h3>
          <p className='text-sm text-muted-foreground'>
            To use SiteGPT, create a account{' '}
            <span className='hidden md:inline'>
              or log into an existing one
            </span>
          </p>
        </div>
      </div>
      <div className='flex w-full flex-col gap-3'>
        <Button asChild className='rounded-lg'>
          <Link href='/sign-up'>Sign Up</Link>
        </Button>
        <Button variant='outline' asChild className='rounded-lg'>
          <Link href='/sign-in'>Sign In</Link>
        </Button>
      </div>
    </div>
  );
}
