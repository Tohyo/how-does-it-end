import { render, screen } from '@testing-library/react';
import Home from '../page';

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        {
          id: 1,
          title: 'Test Article',
          content: 'Test content',
          category: 'test',
          createdAt: '2024-03-20T10:00:00Z'
        }
      ])
  })
) as jest.Mock;

describe('Home Page', () => {
  it('renders page with articles', async () => {
    render(await Home());
    
    expect(screen.getByText('Latest Articles')).toBeInTheDocument();
    expect(screen.getByText('Test Article')).toBeInTheDocument();
  });

  it('fetches articles from the API', async () => {
    render(await Home());
    
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/articles'),
      expect.objectContaining({
        cache: 'no-store',
        headers: {
          'Accept': 'application/json',
        },
      })
    );
  });
}); 