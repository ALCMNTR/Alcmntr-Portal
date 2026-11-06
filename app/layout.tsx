// app/layout.tsx
import React from 'react';

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
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body className="antialiased bg-slate-50">{children}</body>
    </html>
  );
}
