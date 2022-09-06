<?php

namespace Database\Seeders;

use Faker\Factory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;


class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $faker = Factory::create();

        DB::table('users')->insert([
            'first_name' => 'Nguyen',
            'last_name' => 'Vu',
            'user_name' => 'admin',
            'email' => 'nguyenquangvu.work@gmail.com',
            'email_verified_at' => now(),
            'address' => $faker->address(),
            'password' => Hash::make(123),
            'remember_token' => Str::random(10),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // sail artisan migrate:refresh --seed && sail artisan db:seed --class=UserSeeder
    }
}
