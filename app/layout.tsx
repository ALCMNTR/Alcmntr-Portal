// app/layout.tsx
import React from 'react';
import Script from 'next/script';

export const metadata = {
  title: 'Bayan ng Taytay - Citizen Portal | Powered by Alcmntr',
  description: 'Official Digital Municipal Gateway for Taytay, Rizal',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />
      </head>
      <body className="antialiased bg-slate-50">{children}</body>
    </html>
  );
}
