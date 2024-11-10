<?php

namespace App\Entity;

use App\Repository\ArticleRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use JsonSerializable;

#[ORM\Entity(repositoryClass: ArticleRepository::class)]
class Article implements JsonSerializable
{
    public function __construct(
        #[ORM\Id]
        #[ORM\GeneratedValue]
        #[ORM\Column]
        private ?int $id = null,

        #[ORM\Column(length: 255)]
        #[Assert\NotBlank(message: 'Title cannot be blank')]
        #[Assert\Length(
            min: 3,
            max: 255,
            minMessage: 'Title must be at least {{ limit }} characters long',
            maxMessage: 'Title cannot be longer than {{ limit }} characters'
        )]
        public string $title = '',

        #[ORM\Column(type: 'text')]
        #[Assert\NotBlank(message: 'Content cannot be blank')]
        #[Assert\Length(
            min: 10,
            minMessage: 'Content must be at least {{ limit }} characters long'
        )]
        public string $content = '',

        #[ORM\Column(length: 100)]
        #[Assert\NotBlank(message: 'Category cannot be blank')]
        #[Assert\Length(
            max: 100,
            maxMessage: 'Category cannot be longer than {{ limit }} characters'
        )]
        public string $category = '',

        #[ORM\Column]
        public readonly \DateTimeImmutable $createdAt = new \DateTimeImmutable()
    ) {}

    public function getId(): ?int
    {
        return $this->id;
    }

    private function getFormattedCreatedAt(): string
    {
        return $this->createdAt->format('c');
    }

    public function jsonSerialize(): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'content' => $this->content,
            'category' => $this->category,
            'createdAt' => $this->getFormattedCreatedAt()
        ];
    }
} 