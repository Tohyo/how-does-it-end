<?php

namespace App\Action\Article;

use App\Repository\ArticleRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
final class SearchArticlesAction
{
    public function __construct(
        private ArticleRepository $articleRepository
    ) {}

    #[Route('/api/articles/search', name: 'app_articles_search', methods: ['GET'])]
    public function __invoke(Request $request): Response
    {
        $query = $request->query->get('q');
        $category = $request->query->get('category');

        $articles = $this->articleRepository->search($query, $category);

        return new JsonResponse($articles);
    }
} 