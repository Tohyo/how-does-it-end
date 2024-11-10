import { render, screen } from '@testing-library/react';
import ArticleList from '../ArticleList';
import { Article } from '@/types/article';

describe('ArticleList', () => {
  const mockArticles: Article[] = [
    {
      id: 1,
      title: 'Test Article 1',
      content: 'Test content 1',
      category: 'tech',
      createdAt: '2024-03-20T10:00:00Z'
    },
    {
      id: 2,
      title: 'Test Article 2',
      content: 'Test content 2',
      category: 'science',
      createdAt: '2024-03-21T10:00:00Z'
    }
  ];

  it('renders articles correctly', () => {
    render(<ArticleList articles={mockArticles} />);
    
    expect(screen.getByText('Test Article 1')).toBeInTheDocument();
    expect(screen.getByText('Test Article 2')).toBeInTheDocument();
    expect(screen.getByText('tech')).toBeInTheDocument();
    expect(screen.getByText('science')).toBeInTheDocument();
  });

  it('displays "No articles found" when articles array is empty', () => {
    render(<ArticleList articles={[]} />);
    
    expect(screen.getByText('No articles found')).toBeInTheDocument();
  });
}); 