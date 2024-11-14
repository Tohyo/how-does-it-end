import { Article } from '@/types/article';
import { notFound } from 'next/navigation';
import { Badge } from "@/components/ui/badge";
import EditableArticle from '@/components/EditableArticle';

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
        <EditableArticle initialArticle={article} />
      </article>
    </main>
  );
} 