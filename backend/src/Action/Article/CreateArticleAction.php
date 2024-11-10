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
use Symfony\Component\Validator\Validator\ValidatorInterface;

#[AsController]
final class CreateArticleAction 
{
    public function __construct(
        private EntityManagerInterface $entityManager,
        private Security $security,
        private ValidatorInterface $validator
    ) {}

    #[Route('/api/articles', name: 'app_articles_create', methods: ['POST'])]
    public function __invoke(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);
        
        $article = new Article(
            title: $data['title'] ?? '',
            content: $data['content'] ?? '',
            category: $data['category'] ?? ''
        );

        $errors = $this->validator->validate($article);

        if (count($errors) > 0) {
            $errorMessages = [];
            foreach ($errors as $error) {
                $errorMessages[$error->getPropertyPath()] = $error->getMessage();
            }
            
            return new JsonResponse([
                'status' => 'error',
                'errors' => $errorMessages
            ], Response::HTTP_BAD_REQUEST);
        }

        $this->entityManager->persist($article);
        $this->entityManager->flush();

        return new JsonResponse([
            'status' => 'success',
            'data' => $article
        ], Response::HTTP_CREATED);
    }
} 