<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);


        # Users

        \App\Models\User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@test.com',
            'role' => 'admin',
        ]);
        \App\Models\User::factory()->create([
            'name' => 'Customer1',
            'email' => 'customer1@test.com',
            'role' => 'customer',
        ]);
        \App\Models\User::factory()->create([
            'name' => 'Operator1',
            'email' => 'operator1@test.com',
            'role' => 'employee',
        ]);
        \App\Models\User::factory()->create([
            'name' => 'Courier1',
            'email' => 'courier1@test.com',
            'role' => 'employee',
        ]);
        \App\Models\User::factory()->create([
            'name' => 'Courier2',
            'email' => 'courier2@test.com',
            'role' => 'employee',
        ]);
        \App\Models\User::factory()->create([
            'name' => 'Courier3',
            'email' => 'courier3@test.com',
            'role' => 'employee',
        ]);


        # Employees

        \App\Models\Employee::create([
            'user_id' => 3,
            'position' => 'operator',
        ]);
        \App\Models\Employee::create([
            'user_id' => 4,
            'position' => 'courier',
        ]);
        \App\Models\Employee::create([
            'user_id' => 5,
            'position' => 'courier',
        ]);
        \App\Models\Employee::create([
            'user_id' => 6,
            'position' => 'courier',
        ]);



        # Categories

        \App\Models\Category::create([
            'name' => 'Pizzák',
            'place' => 2,
        ]);
        \App\Models\Category::create([
            'name' => 'Hamburgerek',
            'place' => 3,
        ]);

        # FoodItems

        \App\Models\FoodItem::create([
            'category_id' => 1,
            'name' => 'Bazsalikomos pizza',
            'description' => 'Bazsalikom, paradicsom, sajt',
            'price' => 3200,
            'image_path' => 'food-item-images/pizza1.jpg',
            'place' => 1,
        ]);
        \App\Models\FoodItem::create([
            'category_id' => 1,
            'name' => 'Rukkolás pizza',
            'description' => 'Rukkola, mozzarella',
            'price' => 3200,
            'image_path' => 'food-item-images/pizza2.jpg',
            'place' => 2,
        ]);
        \App\Models\FoodItem::create([
            'category_id' => 1,
            'name' => 'Sajtos-sonkás pizza',
            'description' => 'Sonka, paradicsom, sajt',
            'price' => 3200,
            'image_path' => 'food-item-images/pizza3.jpg',
            'place' => 3,
        ]);
        \App\Models\FoodItem::create([
            'category_id' => 1,
            'name' => 'Paprikás pizza',
            'description' => 'Zöldpaprika, pirospaprika, olivabogyó, sonka',
            'price' => 3200,
            'image_path' => 'food-item-images/pizza4.jpg',
            'place' => 4,
        ]);
        \App\Models\FoodItem::create([
            'category_id' => 1,
            'name' => 'Hawaii pizza',
            'description' => 'Ananász, csirkehús, sajt',
            'price' => 3200,
            'image_path' => 'food-item-images/pizza5.jpg',
            'place' => 5,
        ]);
        \App\Models\FoodItem::create([
            'category_id' => 1,
            'name' => 'Kolbászos pizza',
            'description' => 'Kolbász, paradicsom, olivabogyó',
            'price' => 3200,
            'image_path' => 'food-item-images/pizza6.jpg',
            'place' => 6,
        ]);
        \App\Models\FoodItem::create([
            'category_id' => 1,
            'name' => 'Szalámis pizza',
            'description' => 'Szalámi, sajt',
            'price' => 3200,
            'image_path' => 'food-item-images/pizza7.jpg',
            'place' => 7,
        ]);


        \App\Models\FoodItem::create([
            'category_id' => 2,
            'name' => 'Szalonnás hamburger',
            'description' => 'Marhahús, hagyma, uborka, saláta, sajt, ketchup, szalonna',
            'price' => 3600,
            'image_path' => 'food-item-images/burger1.jpg',
            'place' => 1,
        ]);
        \App\Models\FoodItem::create([
            'category_id' => 2,
            'name' => 'Dupla hamburger',
            'description' => 'Dupla marhahús, hagyma, uborka, saláta, sajt, ketchup',
            'price' => 3600,
            'image_path' => 'food-item-images/burger2.jpg',
            'place' => 2,
        ]);
        \App\Models\FoodItem::create([
            'category_id' => 2,
            'name' => 'Normál hamburger',
            'description' => 'Marhahús, hagyma, uborka, saláta, sajt, ketchup',
            'price' => 3600,
            'image_path' => 'food-item-images/burger3.jpg',
            'place' => 3,
        ]);
        \App\Models\FoodItem::create([
            'category_id' => 2,
            'name' => 'Sonkás hamburger',
            'description' => 'Marhahús, hagyma, uborka, saláta, sajt, ketchup, sonka',
            'price' => 3600,
            'image_path' => 'food-item-images/burger4.jpg',
            'place' => 4,
        ]);
        \App\Models\FoodItem::create([
            'category_id' => 2,
            'name' => 'Dupla, extra hagymás hamburger',
            'description' => 'Dupla marhahús, hagyma, uborka, saláta, sajt, ketchup, sonka',
            'price' => 3600,
            'image_path' => 'food-item-images/burger5.jpg',
            'place' => 5,
        ]);
        \App\Models\FoodItem::create([
            'category_id' => 2,
            'name' => 'Fekete hamburger',
            'description' => 'Marhahús, hagyma, uborka, saláta, sajt, majonéz, szalonna',
            'price' => 3600,
            'image_path' => 'food-item-images/burger6.jpg',
            'place' => 6,
        ]);


        \App\Models\Address::create([
            'user_id' => 2,
            'default' => 0,
            'last_name' => 'Kiss',
            'first_name' => 'Imre',
            'phone' => '223334455',
            'zipcode' => '1212',
            'city' => 'Budapest',
            'street' => 'Halmaz u. 48/A.',
            'note' => 'Kapucsengő 6-os',
        ]);
        \App\Models\Address::create([
            'user_id' => 2,
            'default' => 0,
            'last_name' => 'Kiss',
            'first_name' => 'Edina',
            'phone' => '112223344',
            'zipcode' => '1212',
            'city' => 'Budapest',
            'street' => 'Halmaz u. 48/A.',
            'note' => 'Kapucsengő 7-es',
        ]);
        \App\Models\Address::create([
            'user_id' => 2,
            'default' => 0,
            'last_name' => 'Kiss',
            'first_name' => 'Imre',
            'phone' => '223334455',
            'zipcode' => '3232',
            'city' => 'Budapest',
            'street' => 'Munkahely u. 1-23.',
            'note' => 'Dolgozom kft., Humánerőforrás-osztály',
        ]);
    }
}
