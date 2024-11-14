'use client';

import { useActionState  } from 'react';
import { createArticle } from '@/app/actions/articles';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface SubmitButtonProps {
  isPending: boolean;
}

function SubmitButton({ isPending }: SubmitButtonProps) {
  return (
    <Button type="submit" disabled={isPending}>
      {isPending ? 'Creating...' : 'Create Article'}
    </Button>
  );
}

export default function CreateArticleForm() {
  const [error, formAction, isPending] = useActionState(createArticle, null);

  return (
    <form action={formAction} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <Input
          id="title"
          name="title"
          type="text"
          placeholder="Enter article title"
          required
          minLength={3}
          maxLength={255}
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
          Category
        </label>
        <Input
          id="category"
          name="category"
          type="text"
          placeholder="Enter article category"
          required
          maxLength={100}
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
          Content
        </label>
        <Textarea
          id="content"
          name="content"
          placeholder="Write your article content here..."
          required
          minLength={10}
          className="min-h-[300px]"
        />
      </div>

      {error && (
        <div className="text-red-600 text-sm" role="alert">
          {error}
        </div>
      )}

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" formAction="/">
          Cancel
        </Button>
        <SubmitButton isPending={isPending} />
      </div>
    </form>
  );
} 