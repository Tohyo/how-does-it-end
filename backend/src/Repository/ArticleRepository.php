<?php

namespace App\Repository;

use App\Entity\Article;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Article>
 */
class ArticleRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Article::class);
    }

    public function search(?string $query = null, ?string $category = null)
    {
        $qb = $this->createQueryBuilder('a');

        if ($query) {
            $qb->andWhere('a.title LIKE :query OR a.content LIKE :query')
               ->setParameter('query', '%' . $query . '%');
        }

        if ($category) {
            $qb->andWhere('a.category = :category')
               ->setParameter('category', $category);
        }

        return $qb->orderBy('a.createdAt', 'DESC')
                 ->getQuery()
                 ->getResult();
    }
} 