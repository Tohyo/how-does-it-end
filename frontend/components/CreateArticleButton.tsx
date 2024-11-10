'use client';

import { useState } from 'react';
import ArticleForm from './ArticleForm';
import { Article } from '@/types/article';
import { useRouter } from 'next/navigation';

export default function CreateArticleButton() {
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();

  const handleCreateArticle = async (articleData: Omit<Article, 'id' | 'createdAt'>) => {
    try {
      const response = await fetch(`${process.env.PUBLIC_API_URL}/api/articles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(articleData),
      });

      if (!response.ok) {
        throw new Error('Failed to create article');
      }

      setShowForm(false);
      // Refresh the page to show the new article
      router.refresh();
    } catch (error) {
      console.error('Error creating article:', error);
      // You might want to show an error message to the user here
    }
  };

  return (
    <>
      <button
        onClick={() => setShowForm(!showForm)}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        {showForm ? 'Cancel' : 'Create New Article'}
      </button>

      {showForm && (
        <ArticleForm
          onSubmit={handleCreateArticle}
          onCancel={() => setShowForm(false)}
        />
      )}
    </>
  );
} 