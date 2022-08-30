<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class TodoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $startingDate = now();

        return [
            'title' => $this->faker->title() . $this->faker->colorName(),
            'content' => $this->faker->text(),
            'status' => $this->faker->randomElement(['n/a', 'new', 'in-progress', 'pending', 'canceled']),
            'priority' => $this->faker->randomElement(['high', 'medium', 'low']),
            'due_date' => $this->faker->dateTimeBetween($startingDate, strtotime('+6 days'))->format('d-m-Y H:i'),
            'created_at' => now(),
            'created_by' => User::inRandomOrder()->first()->id
        ];
    }


    /**
     * Indicate that the model's email address should be unverified.
     *
     * @return static
     */
    public function deleted()
    {
        return $this->state(function (array $attributes) {
            return [
                'deleted_at' => now(),
            ];
        });
    }
}
