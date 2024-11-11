'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { AlertTriangle } from 'lucide-react';

export default function Navigation() {
  const { isAuthenticated, user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center border-b">
      <div className="container mx-auto max-w-7xl flex justify-between items-center">
        <Link className="flex items-center justify-center" href="#">
          <AlertTriangle className="h-6 w-6 text-red-500" />
          <span className="ml-2 text-2xl font-bold text-gray-900">SpoilerAlert</span>
        </Link>
        <nav className="flex gap-4 sm:gap-6">
        {isAuthenticated ? (
              <>
                <Link href="/articles/new" className="hover:text-blue-600">
                  New Article
                </Link>
                <span className="text-gray-600">
                  {user?.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-800"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-blue-600 hover:text-blue-800"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Register
                </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
} 