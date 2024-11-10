import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import Navigation from '../Navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}));

describe('Navigation', () => {
  const mockRouter = {
    push: jest.fn()
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    localStorage.clear();
  });

  it('shows login and register links when not logged in', () => {
    render(<Navigation />);
    
    expect(screen.getByText(/login/i)).toBeInTheDocument();
    expect(screen.getByText(/register/i)).toBeInTheDocument();
    expect(screen.queryByText(/logout/i)).not.toBeInTheDocument();
  });

  it('shows logout button when logged in', () => {
    localStorage.setItem('token', 'test-token');
    render(<Navigation />);
    
    expect(screen.getByText(/logout/i)).toBeInTheDocument();
    expect(screen.queryByText(/login/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/register/i)).not.toBeInTheDocument();
  });

  it('handles logout correctly', () => {
    localStorage.setItem('token', 'test-token');
    render(<Navigation />);
    
    fireEvent.click(screen.getByText(/logout/i));
    
    expect(localStorage.getItem('token')).toBeNull();
    expect(mockRouter.push).toHaveBeenCalledWith('/login');
  });
}); 