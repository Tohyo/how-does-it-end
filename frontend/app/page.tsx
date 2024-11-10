import ArticleList from '@/components/ArticleList';
import { Article } from '@/types/article';

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
      <h1 className="text-4xl font-bold mb-8">Latest Articles</h1>
      <ArticleList articles={articles} />
    </main>
  );
}
