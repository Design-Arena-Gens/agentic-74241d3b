import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair'
});

export const metadata: Metadata = {
  title: 'Golden Crisp French Fries',
  description: 'A cinematic spotlight on irresistible french fries with a custom-generated video.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable}`}>
        {children}
      </body>
    </html>
  );
}
