import '@/styles/global.css';

import localFont from 'next/font/local';
import { cookies } from 'next/headers';
import { ClerkLoaded, ClerkLoading, ClerkProvider } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import { LoaderCircle } from 'lucide-react';

import { SidebarProvider } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/toaster';
import AppSidebar from '@/components/app-sidebar';
import Header from '@/components/header';

import type { Metadata } from 'next';

const geist = localFont({
  src: '../assets/geist-sans-vf.woff',
  weight: '100 900'
});
const clashDisplay = localFont({
  src: '../assets/clash-display-vf.woff2',
  variable: '--font-clash-display'
});
const sentient = localFont({
  src: '../assets/sentient-vf.woff2',
  variable: '--font-sentient'
});

export const metadata: Metadata = {
  title: 'SiteGPT',
  description: 'Question the web',
  authors: {
    name: 'Rajdeep Ghosh',
    url: 'https://github.com/rajdeep-ghosh'
  },
  icons: {
    icon: [
      {
        rel: 'icon',
        type: 'image/png',
        url: '/favicon-96x96.png',
        sizes: '96x96'
      },
      {
        rel: 'icon',
        type: 'image/svg+xml',
        url: '/favicon.svg'
      }
    ],
    shortcut: '/favicon.ico',
    apple: {
      url: '/apple-touch-icon.png',
      sizes: '180x180'
    }
  },
  manifest: '/site.webmanifest',
  appleWebApp: {
    title: 'SiteGPT'
  }
};

export default async function RootLayout({
  children
}: React.PropsWithChildren) {
  const cookieStore = cookies();
  const { userId } = await auth();

  const defaultOpen = cookieStore.get('sidebar:state')?.value === 'true';

  return (
    <html lang='en' className='dark'>
      <body
        className={`${geist.className} ${clashDisplay.variable} ${sentient.variable}`}
      >
        <ClerkProvider>
          <ClerkLoading>
            <div className='grid h-screen place-items-center'>
              <LoaderCircle className='size-24 animate-spin text-muted-foreground' />
            </div>
          </ClerkLoading>
          <ClerkLoaded>
            <SidebarProvider defaultOpen={defaultOpen}>
              {!!userId && <AppSidebar />}
              <div className='relative w-full'>
                <Header className='absolute top-0' />
                {children}
              </div>
            </SidebarProvider>
          </ClerkLoaded>
        </ClerkProvider>
        <Toaster />
      </body>
    </html>
  );
}
