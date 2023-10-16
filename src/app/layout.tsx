import { TokenProvider } from "@/context/TokenContext";
import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import Navbar from "@/components/navbar/index";
import  { Toaster } from 'react-hot-toast';
const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <TokenProvider>
            <Toaster />
            <Navbar />
            {children}
          </TokenProvider>
        </Providers>
      </body>
    </html>
  );
}
