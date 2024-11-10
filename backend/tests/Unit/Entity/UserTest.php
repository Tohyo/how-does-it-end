<?php

namespace App\Tests\Unit\Entity;

use App\Entity\User;
use PHPUnit\Framework\TestCase;

class UserTest extends TestCase
{
    public function testUserCreation(): void
    {
        $user = new User(
            email: 'test@example.com',
            password: 'hashedpassword'
        );

        $this->assertEquals('test@example.com', $user->email);
        $this->assertEquals('hashedpassword', $user->getPassword());
    }

    public function testUserRoles(): void
    {
        $user = new User(
            email: 'test@example.com',
            password: 'hashedpassword'
        );

        $this->assertContains('ROLE_USER', $user->getRoles());
        
        $user->setRoles(['ROLE_ADMIN']);
        $this->assertContains('ROLE_USER', $user->getRoles());
        $this->assertContains('ROLE_ADMIN', $user->getRoles());
    }
} 