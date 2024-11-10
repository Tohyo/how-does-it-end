import { Article } from '@/types/article';
import { notFound } from 'next/navigation';

async function getArticle(id: string): Promise<Article> {
  const response = await fetch(`${process.env.INTERNAL_API_URL}/api/articles/${id}`, {
    cache: 'no-store',
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    throw new Error('Failed to fetch article');
  }

  return response.json();
}

export default async function ArticlePage({ params }: { params: { id: string } }) {
  const article = await getArticle(params.id);

  return (
    <main className="container mx-auto px-4 py-8">
      <article className="max-w-2xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
          <div className="flex justify-between items-center text-gray-600">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
              {article.category}
            </span>
            <time dateTime={article.createdAt} className="text-sm">
              {new Date(article.createdAt).toLocaleDateString()}
            </time>
          </div>
        </header>
        <div className="prose max-w-none">
          {article.content}
        </div>
      </article>
    </main>
  );
} 