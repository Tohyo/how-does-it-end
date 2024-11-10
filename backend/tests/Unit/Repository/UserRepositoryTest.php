<?php

namespace App\Tests\Unit\Repository;

use App\Entity\User;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;
use Zenstruck\Foundry\Test\ResetDatabase;

class UserRepositoryTest extends KernelTestCase
{
    use ResetDatabase;

    private UserRepository $repository;

    protected function setUp(): void
    {
        self::bootKernel();
        $this->repository = static::getContainer()->get(UserRepository::class);
    }

    public function testFindByEmail(): void
    {
        $user = new User(
            email: 'test@example.com',
            password: password_hash('password', PASSWORD_BCRYPT)
        );
        
        $em = static::getContainer()->get('doctrine')->getManager();
        $em->persist($user);
        $em->flush();

        $foundUser = $this->repository->findOneBy(['email' => 'test@example.com']);
        $this->assertNotNull($foundUser);
        $this->assertEquals('test@example.com', $foundUser->email);
    }

    public function testEmailExists(): void
    {
        $user = new User(
            email: 'existing@example.com',
            password: password_hash('password', PASSWORD_BCRYPT)
        );
        
        $em = static::getContainer()->get('doctrine')->getManager();
        $em->persist($user);
        $em->flush();

        $exists = $this->repository->findOneBy(['email' => 'existing@example.com']);
        $this->assertNotNull($exists);

        $notExists = $this->repository->findOneBy(['email' => 'nonexistent@example.com']);
        $this->assertNull($notExists);
    }
} 