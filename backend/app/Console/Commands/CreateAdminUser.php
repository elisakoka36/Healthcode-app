<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;

class CreateAdminUser extends Command
{
    protected $signature = 'create:admin {email} {password}';
    protected $description = 'Creates a new admin user';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        $email = $this->argument('email');
        $password = $this->argument('password');

        // Check if user already exists
        if (User::where('email', $email)->exists()) {
            $this->error('A user with this email already exists!');
            return;
        }

        // Create new user with admin privileges
        $user = User::create([
            'name' => 'Admin',
            'email' => $email,
            'password' => bcrypt($password),
            'is_admin' => true
        ]);

        $this->info('Admin user created successfully!');
    }
}
