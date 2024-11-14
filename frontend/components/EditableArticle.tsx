'use client';

import { useState } from 'react';
import { Article } from '@/types/article';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from '@/contexts/AuthContext';

interface EditableArticleProps {
  initialArticle: Article;
}

export default function EditableArticle({ initialArticle }: EditableArticleProps) {
  const [article, setArticle] = useState<Article>(initialArticle);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    title: initialArticle.title,
    content: initialArticle.content,
    category: initialArticle.category
  });
  const { isAuthenticated } = useAuth();

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${process.env.PUBLIC_API_URL}/api/articles/${article.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editForm),
      });

      if (!response.ok) {
        throw new Error('Failed to update article');
      }

      const { data: updatedArticle } = await response.json();
      setArticle(updatedArticle);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating article:', error);
    }
  };

  return (
    <>
      {isEditing ? (
        <form onSubmit={handleEdit} className="space-y-4">
          <div>
            <Input
              type="text"
              value={editForm.title}
              onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
              placeholder="Title"
              className="text-3xl font-bold"
            />
          </div>
          <div>
            <Input
              type="text"
              value={editForm.category}
              onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
              placeholder="Category"
              className="w-full"
            />
          </div>
          <div>
            <Textarea
              value={editForm.content}
              onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
              placeholder="Content"
              className="min-h-[200px]"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      ) : (
        <>
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
            <div className="flex justify-between items-center text-gray-600">
              <Badge variant="secondary">
                {article.category}
              </Badge>
              {/* <time dateTime={article.createdAt} className="text-sm">
                {new Date(article.createdAt).toLocaleDateString()}
              </time> */}
            </div>
            {isAuthenticated && (
              <Button
                onClick={() => setIsEditing(true)}
                variant="outline"
                className="mt-4"
              >
                Edit Article
              </Button>
            )}
          </header>
          <div className="prose max-w-none">
            {article.content}
          </div>
        </>
      )}
    </>
  );
} 