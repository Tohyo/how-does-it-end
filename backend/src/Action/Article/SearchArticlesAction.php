<?php

namespace App\Action\Article;

use App\Repository\ArticleRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\HttpKernel\Attribute\MapQueryParameter;

#[AsController]
final class SearchArticlesAction
{
    public function __construct(
        private ArticleRepository $articleRepository
    ) {}

    #[Route('/api/articles/search', name: 'app_articles_search', methods: ['GET'])]
    public function __invoke(
        #[MapQueryParameter] string $query,
        #[MapQueryParameter] string $category
    ): Response
    {
        return new JsonResponse($this->articleRepository->search($query, $category));
    }
} 