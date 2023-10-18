import { TokenProvider } from '@/context/TokenContext';
import './globals.css';
import { Inter } from 'next/font/google';

import Navbar from '@/components/navbar/index';
import { Toaster } from 'react-hot-toast';
import { WalletProvider } from '@/context/WalletContext';
const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WalletProvider>
          <TokenProvider>
            <Toaster />
            <Navbar />
            {children}
          </TokenProvider>
        </WalletProvider>
      </body>
    </html>
  );
}
