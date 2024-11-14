import '@/styles/global.css';

import localFont from 'next/font/local';

import type { Metadata } from 'next';

const geist = localFont({
  src: '../assets/geist-sans-vf.woff',
  weight: '100 900'
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
    <html lang='en'>
      <body className={geist.className}>{children}</body>
    </html>
  );
}
