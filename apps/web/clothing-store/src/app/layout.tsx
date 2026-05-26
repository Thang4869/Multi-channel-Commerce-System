import type { Metadata } from 'next';
import { Cormorant_Garamond, Source_Sans_3 } from 'next/font/google';
import './globals.css';

const bodyFont = Source_Sans_3({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-body',
});

const headingFont = Cormorant_Garamond({
  weight: '600',
  subsets: ['latin'],
  variable: '--font-heading',
});

export const metadata: Metadata = {
  title: 'Clothing Atelier',
  description: 'Layered essentials and tailored silhouettes.',
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
