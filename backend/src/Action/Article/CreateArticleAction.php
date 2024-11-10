<?php

namespace App\Action\Article;

use App\Entity\Article;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
final class CreateArticleAction 
{
    public function __construct(
        private EntityManagerInterface $entityManager,
        private Security $security
    ) {}

    #[Route('/api/articles', name: 'app_articles_create', methods: ['POST'])]
    public function __invoke(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);
        
        $article = new Article();
        $article->setTitle($data['title']);
        $article->setContent($data['content']);
        $article->setCategory($data['category']);
        $article->setAuthor($this->security->getUser());

        $this->entityManager->persist($article);
        $this->entityManager->flush();

        return new JsonResponse($article);
    }
} 