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

    #[Route('/api/articles/{title}', name: 'app_articles_get', methods: ['GET'])]
    public function __invoke(string $title): Response
    {
        $article = $this->articleRepository->findOneBy(['title' => $title]);
        
        if (!$article) {
            throw new NotFoundHttpException('Article not found');
        }

        return new JsonResponse($article);
    }
} 