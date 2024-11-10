import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/navigation';
import RegisterForm from '../RegisterForm';
import { act } from 'react';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}));

describe('RegisterForm', () => {
  const mockRouter = {
    push: jest.fn()
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    global.fetch = jest.fn();
  });

  it('renders registration form', () => {
    render(<RegisterForm />);
    
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
  });

  it('handles successful registration', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ status: 'success' })
    });

    render(<RegisterForm />);

    await act(async () => {
      await userEvent.type(screen.getByLabelText(/name/i), 'Test User');
      await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
      await userEvent.type(screen.getByLabelText(/password/i), 'Password123!');
      fireEvent.click(screen.getByRole('button', { name: /register/i }));
    });

    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith('/login');
    });
  });

  it('displays error message on failed registration', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ message: 'Email already exists' })
    });

    render(<RegisterForm />);

    await act(async () => {
      await userEvent.type(screen.getByLabelText(/name/i), 'Test User');
      await userEvent.type(screen.getByLabelText(/email/i), 'existing@example.com');
      await userEvent.type(screen.getByLabelText(/password/i), 'Password123!');
      
      fireEvent.click(screen.getByRole('button', { name: /register/i }));
    });

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Email already exists');
    });
  });
}); 