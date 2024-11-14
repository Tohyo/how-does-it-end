import { act, render, screen } from '@testing-library/react';
import ArticlePage from '../page';
import { notFound } from 'next/navigation';
import { AuthProvider } from '@/contexts/AuthContext';

jest.mock('next/navigation', () => ({
  notFound: jest.fn()
}));

const mockAuthContext = {
  isAuthenticated: false,
  // ... other auth context values you might need
};

describe('ArticlePage', () => {
  const mockArticle = {
    id: 1,
    title: 'Test Article',
    content: 'Test content',
    category: 'test',
    createdAt: '2024-03-20T10:00:00Z'
  };

  beforeEach(() => {
    // Reset all mocks before each test
    jest.resetAllMocks();
    
    // Mock the fetch function
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockArticle)
      })
    ) as jest.Mock;
  });

  it('renders article details correctly', async () => {
    await act(async () => {
    render(
      <AuthProvider value={mockAuthContext}>
        {await ArticlePage({ params: { id: '1' } })}
        </AuthProvider>
      );
    });

    expect(screen.getByText('Test Article')).toBeInTheDocument();
    expect(screen.getByText('Test content')).toBeInTheDocument();
    expect(screen.getByText('test')).toBeInTheDocument();
  });

  it('calls the API with correct URL', async () => {
    await ArticlePage({ params: { id: '1' } });

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/articles/1'),
      expect.objectContaining({
        cache: 'no-store',
        headers: {
          'Accept': 'application/json',
        },
      })
    );
  });

  it('handles 404 errors correctly', async () => {
    const mockedNotFound = jest.mocked(notFound);

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 404
      })
    ) as jest.Mock;

    // Wrap the call in try-catch since notFound() doesn't halt execution in tests
    try {
      await ArticlePage({ params: { id: '999' } });
    } catch (error) {
      // Ignore the error as we expect it to throw
    }

    expect(mockedNotFound).toHaveBeenCalled();
  });

  it('handles other errors correctly', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500
      })
    ) as jest.Mock;

    await expect(ArticlePage({ params: { id: '1' } })).rejects.toThrow('Failed to fetch article');
  });
}); 