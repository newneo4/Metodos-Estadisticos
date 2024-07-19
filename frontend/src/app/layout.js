'use client'

import { Inter } from "next/font/google";
import "./globals.css";
import { usePathname } from 'next/navigation';
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const noLayoutPaths = pathname.startsWith('/intra');

  return (
    <html lang="en">
      <body className={inter.className}>
        {!noLayoutPaths && <Navbar />}
        {children}
      </body>
    </html>
  );
}
