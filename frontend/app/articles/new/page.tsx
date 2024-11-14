import CreateArticleForm from '@/components/CreateArticleForm';

export default function CreateArticlePage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Create New Article</h1>
        <CreateArticleForm />
      </div>
    </main>
  );
} 