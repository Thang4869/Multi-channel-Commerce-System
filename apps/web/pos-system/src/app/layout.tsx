import type { Metadata } from 'next';
import { Teko, Nunito_Sans } from 'next/font/google';
import './globals.css';

const bodyFont = Nunito_Sans({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-body',
});

const headingFont = Teko({
  weight: '500',
  subsets: ['latin'],
  variable: '--font-heading',
});

export const metadata: Metadata = {
  title: 'POS System',
  description: 'Fast checkout for in-store teams.',
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
