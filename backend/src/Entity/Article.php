<?php

namespace App\Entity;

use App\Repository\ArticleRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ArticleRepository::class)]
class Article
{
    public function __construct(
        #[ORM\Id]
        #[ORM\GeneratedValue]
        #[ORM\Column]
        public ?int $id = null,

        #[ORM\Column(length: 255)]
        public ?string $title = null,

        #[ORM\Column(type: 'text')]
        public ?string $content = null,

        #[ORM\Column]
        public ?\DateTimeImmutable $createdAt = new \DateTimeImmutable(),

        #[ORM\Column]
        public ?\DateTimeImmutable $updatedAt = new \DateTimeImmutable(),

        #[ORM\Column(length: 255)]
        public ?string $category = null,

        #[ORM\ManyToOne(inversedBy: 'articles')]
        #[ORM\JoinColumn(nullable: false)]
        public ?User $author = null,
    ) {}
} 