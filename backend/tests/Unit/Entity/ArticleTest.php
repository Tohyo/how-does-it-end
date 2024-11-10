<?php

namespace App\Tests\Unit\Entity;

use App\Entity\Article;
use PHPUnit\Framework\TestCase;

class ArticleTest extends TestCase
{
    public function testArticleCreation(): void
    {
        $article = new Article(
            title: 'Test Title',
            content: 'Test Content that is long enough for validation',
            category: 'Test Category'
        );

        $this->assertEquals('Test Title', $article->title);
        $this->assertEquals('Test Content that is long enough for validation', $article->content);
        $this->assertEquals('Test Category', $article->category);
        $this->assertInstanceOf(\DateTimeImmutable::class, $article->createdAt);
    }

    public function testArticleJsonSerialization(): void
    {
        $now = new \DateTimeImmutable();
        $article = new Article(
            id: 1,
            title: 'Test Title',
            content: 'Test Content',
            category: 'Test Category',
            createdAt: $now
        );

        $jsonData = $article->jsonSerialize();

        $this->assertIsArray($jsonData);
        $this->assertEquals(1, $jsonData['id']);
        $this->assertEquals('Test Title', $jsonData['title']);
        $this->assertEquals('Test Content', $jsonData['content']);
        $this->assertEquals('Test Category', $jsonData['category']);
        $this->assertEquals($now->format('c'), $jsonData['createdAt']);
    }
} 