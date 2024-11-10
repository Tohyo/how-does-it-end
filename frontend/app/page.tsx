import ArticleList from '@/components/ArticleList';
import CreateArticleButton from '@/components/CreateArticleButton';
import { Article } from '@/types/article';

// Server Component
export default async function Home() {
  const response = await fetch(`${process.env.INTERNAL_API_URL}/api/articles`, {
    cache: 'no-store',
    headers: {
      'Accept': 'application/json',
    },
  });
  const articles: Article[] = await response.json();

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Latest Articles</h1>
        <CreateArticleButton />
      </div>
      <ArticleList articles={articles} />
    </main>
  );
}
