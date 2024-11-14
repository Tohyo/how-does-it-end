import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import CreateArticleForm from '../CreateArticleForm';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}));

jest.mock('@/contexts/AuthContext', () => ({
  useAuth: jest.fn()
}));

describe('CreateArticleForm', () => {
  const mockRouter = {
    push: jest.fn()
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useAuth as jest.Mock).mockReturnValue({ isAuthenticated: true });
    global.fetch = jest.fn();
  });

  it('redirects to login if not authenticated', () => {
    (useAuth as jest.Mock).mockReturnValue({ isAuthenticated: false });
    render(<CreateArticleForm />);
    
    expect(mockRouter.push).toHaveBeenCalledWith('/login');
  });

  it('submits form successfully', async () => {
    const mockArticle = { id: 1, title: 'Test Article' };
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockArticle)
    });

    render(<CreateArticleForm />);

    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: 'Test Article' }
    });
    fireEvent.change(screen.getByLabelText(/category/i), {
      target: { value: 'Test Category' }
    });
    fireEvent.change(screen.getByLabelText(/content/i), {
      target: { value: 'Test content for the article' }
    });

    fireEvent.click(screen.getByText('Create Article'));

    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith('/articles/1');
    });
  });

  it('displays error message on failure', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ error: 'Failed to create article' })
    });

    render(<CreateArticleForm />);

    fireEvent.click(screen.getByText('Create Article'));

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Failed to create article');
    });
  });
}); 