import { Inter } from 'next/font/google';
import Navigation from '@/components/Navigation';
import { AuthProvider } from '@/contexts/AuthContext';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <Navigation />
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
