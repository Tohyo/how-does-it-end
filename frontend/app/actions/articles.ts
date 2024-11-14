'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function createArticle(previousState: FormData, formData: FormData) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');

  if (!token) {
    redirect('/login');
  }

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
    return await response.json();
  }

  const { data: article } = await response.json();
  revalidatePath('/');
  redirect(`/articles/${article.id}`);
} 