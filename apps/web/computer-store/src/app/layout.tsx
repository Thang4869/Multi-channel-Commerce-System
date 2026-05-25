import type { Metadata } from 'next';
import { Space_Grotesk, IBM_Plex_Sans } from 'next/font/google';
import './globals.css';

const bodyFont = IBM_Plex_Sans({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-body',
});

const headingFont = Space_Grotesk({
  weight: '600',
  subsets: ['latin'],
  variable: '--font-heading',
});

export const metadata: Metadata = {
  title: 'Circuit Depot',
  description: 'Hardware curated for creators and builders.',
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
