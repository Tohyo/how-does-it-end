import { render, screen } from '@testing-library/react';
import CreateArticlePage from '../page';

describe('CreateArticlePage', () => {
  it('renders create article page', () => {
    render(<CreateArticlePage />);
    
    expect(screen.getByText('Create New Article')).toBeInTheDocument();
  });
}); 