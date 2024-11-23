import '@/styles/global.css';

import localFont from 'next/font/local';

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

export const metadata: Metadata = {
  title: 'SiteGPT',
  description: 'Question the web',
  authors: {
    name: 'Rajdeep Ghosh',
    url: 'https://github.com/rajdeep-ghosh'
  }
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang='en' className='dark'>
      <body
        className={`${geist.className} ${clashDisplay.variable} bg-primary-foreground`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
