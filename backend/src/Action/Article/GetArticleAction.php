<?php

namespace App\Action\Article;

use App\Repository\ArticleRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
final class GetArticleAction
{
    public function __construct(
        private ArticleRepository $articleRepository
    ) {}

    #[Route('/api/articles/{id}', name: 'app_article_get', methods: ['GET'])]
    public function __invoke(int $id): Response
    {
        $article = $this->articleRepository->find($id);

        if (!$article) {
            return new JsonResponse([
                'status' => 'error',
                'message' => 'Article not found'
            ], Response::HTTP_NOT_FOUND);
        }

        return new JsonResponse($article);
    }
} 