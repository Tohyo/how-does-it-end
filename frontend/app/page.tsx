import { Article } from '@/types/article';

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BookOpen, Film, Tv, Clock } from "lucide-react"
import Link from "next/link"

export default async function Home() {
  const response = await fetch(`${process.env.INTERNAL_API_URL}/api/articles`, {
    cache: 'no-store',
    headers: {
      'Accept': 'application/json',
    },
  });
  const articles: Article[] = await response.json();
  
  return (
    <>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center space-y-4 text-center mx-auto max-w-3xl">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Spoil Responsibly with SpoilerAlert
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  The ultimate platform for sharing and discovering how movies, books, TV shows, and more end. Because
                  sometimes, you just need to know.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input className="max-w-lg flex-1" placeholder="Enter a title..." type="text" />
                  <Button type="submit">Search</Button>
                </form>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Features</h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 justify-center mx-auto max-w-5xl">
              <div className="flex flex-col items-center space-y-2 border-gray-200 p-4 rounded-lg">
                <Film className="h-10 w-10 text-red-500" />
                <h3 className="text-xl font-bold">Movies</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Discover how your favorite films conclude without watching them.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-200 p-4 rounded-lg">
                <BookOpen className="h-10 w-10 text-red-500" />
                <h3 className="text-xl font-bold">Books</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Skip to the last chapter and find out how the story ends.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-200 p-4 rounded-lg">
                <Tv className="h-10 w-10 text-red-500" />
                <h3 className="text-xl font-bold">TV Shows</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Learn about series finales without the long-term commitment.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">How It Works</h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 justify-center mx-auto max-w-5xl">
              <div className="flex flex-col items-center space-y-2 border-gray-200 p-4 rounded-lg">
                <div className="bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-2xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-bold">Search</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Enter the title of the movie, book, or TV show you're curious about.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-200 p-4 rounded-lg">
                <div className="bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-2xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-bold">Read</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Browse through user-submitted endings and spoilers.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-200 p-4 rounded-lg">
                <div className="bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-2xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-bold">Contribute</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Share your own spoilers and help others satisfy their curiosity.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Recent Articles</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mx-auto max-w-5xl">
              {articles.map((article) => (
                <Link href={`/articles/${article.id}`} key={article.id}>
                  <article className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden">
                    <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-red-500">{article.category}</span>
                      {/* <time className="text-sm text-gray-500 dark:text-gray-400" dateTime={article.date}>
                        {new Date(article.date).toLocaleDateString()}
                      </time> */}
                    </div>
                    <h3 className="text-lg font-semibold leading-tight mb-2">
                      {article.title}
                    </h3>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>5 min read</span>
                    </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button variant="outline">View All Articles</Button>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center space-y-4 text-center mx-auto max-w-3xl">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Spoil Responsibly?
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Join our community of spoiler enthusiasts and start sharing or discovering endings today.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <Button className="w-full" size="lg">
                  Sign Up Now
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center justify-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 SpoilerAlert. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </>
  )
}
