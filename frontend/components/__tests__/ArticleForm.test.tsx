import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ArticleForm from '../ArticleForm';
import { act } from 'react';

describe('ArticleForm', () => {
  const mockOnSubmit = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders form fields correctly', () => {
    render(<ArticleForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);
    
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/content/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create article/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
  });

  it('submits form with correct data', async () => {
    render(<ArticleForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);
    
    await act(async () => {
      await userEvent.type(screen.getByLabelText(/title/i), 'Test Title');
      await userEvent.type(screen.getByLabelText(/category/i), 'Test Category');
      await userEvent.type(screen.getByLabelText(/content/i), 'Test Content');
      
      fireEvent.click(screen.getByRole('button', { name: /create article/i }));
    });
    
    expect(mockOnSubmit).toHaveBeenCalledWith({
      title: 'Test Title',
      category: 'Test Category',
      content: 'Test Content'
    });
  });

  it('calls onCancel when cancel button is clicked', () => {
    render(<ArticleForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);
    
    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
    
    expect(mockOnCancel).toHaveBeenCalled();
  });

  it('validates required fields', async () => {
    render(<ArticleForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);
    
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /create article/i }));
    });
    
    expect(mockOnSubmit).not.toHaveBeenCalled();
    expect(screen.getByLabelText(/title/i)).toBeInvalid();
    expect(screen.getByLabelText(/category/i)).toBeInvalid();
    expect(screen.getByLabelText(/content/i)).toBeInvalid();
  });
}); 