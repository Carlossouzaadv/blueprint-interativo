import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Blueprint Interativo | Carlos Souza',
  description:
    'Interactive portfolio showcasing AI/SaaS architecture expertise and decision-making patterns.',
  keywords: 'AI, SaaS, Architecture, Portfolio, Carlos Souza',
  openGraph: {
    title: 'Blueprint Interativo | Carlos Souza',
    description: 'Interactive portfolio showcasing AI/SaaS architecture expertise',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-slate-900 antialiased">{children}</body>
    </html>
  );
}
