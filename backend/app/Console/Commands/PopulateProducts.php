<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Product; // Import the Product model

class PopulateProducts extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:populate-products';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Populate the products table with sample data';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // Sample data for products
        $productsData = [
            [
                'id' => 1,
                'name' => 'Advil',
                'image' => 'advil.webp',
                'price' => 59,
            ],
            [
                'id' => 2,
                'name' => 'Allegra',
                'image' => 'allegra.png',
                'price' => 75,
            ],
            [
                'id' => 3,
                'name' => 'Ibuprofen',
                'image' => 'ibuprofen.png',
                'price' => 82,
            ],
            [
                'id' => 4,
                'name' => 'Loratadine',
                'image' => 'loratadine.png',
                'price' => 39,
            ],
            [
                'id' => 5,
                'name' => 'Zyrtec',
                'image' => 'zyrtec.png',
                'price' => 11,
            ],
            [
                'id' => 6,
                'name' => 'Vitamine B12',
                'image' => 'b12.png',
                'price' => 24,
            ],
            [
                'id' => 7,
                'name' => 'Fess spray',
                'image' => 'fess.webp',
                'price' => 24,
            ],
            [
                'id' => 8,
                'name' => 'Sudafed Liquid',
                'image' => 'Sudafed-Liquid.png',
                'price' => 24,
            ],
        ];

        // Loop through the sample data and create products in the database
        foreach ($productsData as $productData) {
            Product::create([
                'name' => $productData['name'],
                'image' => $productData['image'],
                'price' => $productData['price'],
            ]);
        }

        $this->info('Products have been populated successfully!');
    }
}
