<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\FoodItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Intervention\Image\ImageManager;
use Illuminate\Support\Str;

class FoodItemController extends Controller
{

    public function create(Category $category)
    {
        return Inertia::render('Admin/EditFoodMenu/FoodItems/Create', ['categoryId' => $category->id]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:food_items'],
            'description' => ['nullable', 'string', 'max:1000'],
            'price' => ['required', 'numeric', 'min:0', 'max:1000000'],
            'image' => ['nullable', 'mimes:jpg,png', 'max:50000'],
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imageManager = ImageManager::gd();
            $image = $imageManager->read($request->file('image'));
            $randomImageName = Str::random(40);

            if (Storage::put('food-item-images/' . $randomImageName . '.jpg', $image->scaleDown(500, 500)->toJpeg()->toFilePointer())) {
                $imagePath = 'food-item-images/' . $randomImageName . '.jpg';
            }
        }

        $maxPlace = FoodItem::where('category_id', $request['category_id'])->max('place');
        $place = 1;
        if ($maxPlace) {
            $place = $maxPlace + 1;
        }

        FoodItem::create([
            'category_id' => $request['category_id'],
            'name' => $request['name'],
            'description' => $request['description'],
            'price' => $request['price'],
            'image_path' => $imagePath,
            'place' => $place,
        ]);

        return to_route('admin.edit-food-menu.index');
    }

    public function edit(FoodItem $foodItem)
    {
        if ($foodItem->image_path) {
            if (env('FILESYSTEM_DISK') === 's3') {
                $imageTemporaryUrl = Storage::temporaryUrl($foodItem->image_path, now()->addMinutes(1));
                $foodItem->image_path = $imageTemporaryUrl;
            } else if (env('FILESYSTEM_DISK') === 'public') {
                $foodItem->image_path = 'http://localhost/storage/' . $foodItem->image_path;
            }
        }

        return Inertia::render('Admin/EditFoodMenu/FoodItems/Edit', ['foodItem' => $foodItem]);
    }

    public function update(Request $request, FoodItem $foodItem)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255', Rule::unique('food_items')->ignore($foodItem->id)],
            'description' => ['nullable', 'string', 'max:1000'],
            'price' => ['required', 'numeric', 'min:0', 'max:1000000'],
            'image' => ['nullable', 'mimes:jpg,png', 'max:50000'],
        ]);

        $imagePath = $foodItem->image_path;

        if ($request->hasFile('image')) {
            if ($imagePath) {
                Storage::delete($imagePath);
            }

            $imageManager = ImageManager::gd();
            $image = $imageManager->read($request->file('image'));
            $randomImageName = Str::random(40);

            if (Storage::put('food-item-images/' . $randomImageName . '.jpg', $image->scaleDown(500, 500)->toJpeg()->toFilePointer())) {
                $imagePath = 'food-item-images/' . $randomImageName . '.jpg';
            }
        }

        $foodItem->update([
            'name' => $request['name'],
            'description' => $request['description'],
            'price' => $request['price'],
            'image_path' => $imagePath,
        ]);


        return to_route('admin.edit-food-menu.index');
    }

    public function place(Request $request, FoodItem $foodItem)
    {


        $targetFoodItem = FoodItem::where('place', $request['place'])->first();

        if (!$targetFoodItem || $foodItem->place === $request['place']) {
            return to_route('admin.edit-food-menu.index');
        }

        $targetFoodItemPlace = $targetFoodItem->place;
        $sourceFoodItemPlace = $foodItem->place;

        if ($targetFoodItemPlace < $sourceFoodItemPlace) {
            $restFoodItems = FoodItem::where('category_id', $foodItem->category_id)->where('place', '>=', $targetFoodItemPlace)->where('id', '<>', $foodItem->id)->orderBy('place')->get();

            $foodItem->place = $targetFoodItemPlace;
            $foodItem->save();

            $i = $targetFoodItemPlace + 1;
            foreach ($restFoodItems as $restFoodItem) {
                $restFoodItem->place = $i;
                $restFoodItem->save();
                $i++;
            }
        } else {
            $restFoodItems = FoodItem::where('category_id', $foodItem->category_id)->where('place', '<=', $targetFoodItemPlace)->where('id', '<>', $foodItem->id)->orderBy('place')->get();

            $foodItem->place = $targetFoodItemPlace;
            $foodItem->save();

            $i = 1;
            foreach ($restFoodItems as $restFoodItem) {
                $restFoodItem->place = $i;
                $restFoodItem->save();
                $i++;
            }
        }
        return to_route('admin.edit-food-menu.index');
    }

    public function destroy(FoodItem $foodItem)
    {
        $foodItem->delete();
    }
}
