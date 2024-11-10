import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';

// Mock the Next.js router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    refresh: jest.fn(),
  })),
}));

// Mock fetch globally
global.fetch = jest.fn(() => 
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([
      {
        id: 1,
        title: 'Test Article',
        category: 'Test',
        content: 'Test content',
        createdAt: '2024-01-01',
      }
    ])
  })
) as jest.Mock; 