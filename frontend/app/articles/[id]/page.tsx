import { Button } from '@/components/ui/button';
import { Article } from '@/types/article';
import { notFound } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Clock, ThumbsUp, MessageSquare, Share2 } from "lucide-react"

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
      <main className="flex-1">
        <article className="container mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <header className="mb-8">
            <Badge className="mb-2">{article.category}</Badge>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">{article.title}</h1>
            {/* <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={article.author.avatar} alt={article.author.name} />
                <AvatarFallback>{article.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{article.author.name}</p>
                <p className="text-sm text-gray-500">
                  Published on {new Date(article.date).toLocaleDateString()}
                </p>
              </div>
            </div> */}
          </header>
          <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: article.content }} />
          {/* <footer className="mt-8 pt-8 border-t">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm">
                  <ThumbsUp className="h-4 w-4 mr-2" />
                  {article.likes}
                </Button>
                <Button variant="outline" size="sm">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  {article.comments}
                </Button>
              </div>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </footer> */}
        </article>
      </main>
  )
} 