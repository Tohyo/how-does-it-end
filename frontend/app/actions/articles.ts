'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function createArticle(formData: FormData) {
  const cookieStore = cookies();
  const token = cookieStore.get('token');

  if (!token) {
    redirect('/login');
  }

  console.log(formData);

  const articleData = {
    title: formData.get('title'),
    content: formData.get('content'),
    category: formData.get('category')
  };

  const response = await fetch(`${process.env.INTERNAL_API_URL}/api/articles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token.value}`,
    },
    body: JSON.stringify(articleData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create article');
  }

  const article = await response.json();
  revalidatePath('/');
  redirect(`/articles/${article.id}`);
} 