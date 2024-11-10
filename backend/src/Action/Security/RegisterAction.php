<?php

namespace App\Action\Security;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
#[Route('/api/register', name: 'app_register', methods: ['POST'])]
class RegisterAction
{
    public function __construct(
        private EntityManagerInterface $entityManager,
        private UserPasswordHasherInterface $passwordHasher,
        private ValidatorInterface $validator
    ) {}

    public function __invoke(Request $request): JsonResponse/*  */
    {
        $data = json_decode($request->getContent(), true);

        $user = new User();
        $user->email = $data['email'] ?? '';
        $user->setPlainPassword($data['password'] ?? '');

        // The UniqueEntity constraint needs the entity to be validated with Default group
        $errors = $this->validator->validate($user, null, ['Default', 'registration']);

        if (count($errors) > 0) {
            $errorMessages = [];
            foreach ($errors as $error) {
                $errorMessages[$error->getPropertyPath()] = $error->getMessage();
            }
            return new JsonResponse(['errors' => $errorMessages], Response::HTTP_BAD_REQUEST);
        }

        // Hash the password
        $hashedPassword = $this->passwordHasher->hashPassword(
            $user,
            $user->getPlainPassword()
        );
        $user->setPassword($hashedPassword);
        $user->eraseCredentials();

        $this->entityManager->persist($user);
        $this->entityManager->flush();

        return new JsonResponse($user, Response::HTTP_CREATED);
    }
} 