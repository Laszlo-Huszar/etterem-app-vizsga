<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class FoodMenuController extends Controller
{
    public function index()
    {
        $categories = Category::with(
            [
                'foodItems' => function ($query) {
                    $query->orderBy('place');
                }
            ]
        )->orderBy('place')->get(['id', 'name', 'place']);

        foreach ($categories as $category) {
            foreach ($category->foodItems as $foodItem) {
                if ($foodItem->image_path) {

                    if (env('FILESYSTEM_DISK') === 's3') {
                        $imageTemporaryUrl = Storage::temporaryUrl($foodItem->image_path, now()->addMinutes(1));
                        $foodItem->image_path = $imageTemporaryUrl;
                    } else if (env('FILESYSTEM_DISK') === 'public') {
                        $foodItem->image_path = 'http://localhost/storage/' . $foodItem->image_path;
                    }
                }
            }
        }


        return Inertia::render('FoodMenu/Index', ['categories' => $categories]);
    }
}
