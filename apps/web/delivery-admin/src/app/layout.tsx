import type { Metadata } from 'next';
import { Oswald, Barlow } from 'next/font/google';
import './globals.css';

const bodyFont = Barlow({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-body',
});

const headingFont = Oswald({
  weight: '500',
  subsets: ['latin'],
  variable: '--font-heading',
});

export const metadata: Metadata = {
  title: 'Delivery Admin',
  description: 'Dispatch, track, and resolve delivery operations.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${headingFont.variable}`}>
      <body>{children}</body>
    </html>
  );
}
