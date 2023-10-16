import '../client/assets/styles/global.css';
import '@radix-ui/themes/styles.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css';

import { ReactNode } from 'react';
import { Montserrat } from 'next/font/google';
import { Metadata } from 'next';
import { Theme } from '@radix-ui/themes';
import { ToastContainer } from 'react-toastify';

const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NestJS + NextJS template 🚀!',
  description: 'NestJS + NextJS template',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${montserrat.className}`}>
        <Theme>
          {children}
          <ToastContainer />
        </Theme>
      </body>
    </html>
  );
}
