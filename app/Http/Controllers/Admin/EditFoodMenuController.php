<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class EditFoodMenuController extends Controller
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

        return Inertia::render('Admin/EditFoodMenu/Index', ['categories' => $categories]);
    }
}
