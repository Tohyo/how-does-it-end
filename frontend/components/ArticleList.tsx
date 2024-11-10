import { Article } from '@/types/article';

interface ArticleListProps {
  articles: Article[];
}

export default function ArticleList({ articles = [] }: ArticleListProps) {
  if (!articles || articles.length === 0) {
    return <p>No articles found</p>;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <article key={article.id} className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
          <p className="text-gray-600 mb-4">{article.content.substring(0, 150)}...</p>
          <div className="flex justify-between items-center">
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
              {article.category}
            </span>
            <time dateTime={article.createdAt} className="text-gray-500 text-sm">
              {article.createdAt}
            </time>
          </div>
        </article>
      ))}
    </div>
  );
} 