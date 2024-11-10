<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;

#[ORM\Entity(repositoryClass: UserRepository::class)]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    public function __construct(
        #[ORM\Id]
        #[ORM\GeneratedValue]
        #[ORM\Column]
        public ?int $id = null,

        #[ORM\Column(length: 180, unique: true)]
        public ?string $email = null,

        #[ORM\Column]
        public array $roles = [],

        #[ORM\Column]
        public ?string $password = null
    ) {}

    // Required by UserInterface
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    // Required by UserInterface
    public function getRoles(): array
    {
        $roles = $this->roles;
        $roles[] = 'ROLE_USER';
        return array_unique($roles);
    }

    // Required by UserInterface
    public function eraseCredentials(): void
    {
    }

    // Required by PasswordAuthenticatedUserInterface
    public function getPassword(): string
    {
        return $this->password;
    }
} 