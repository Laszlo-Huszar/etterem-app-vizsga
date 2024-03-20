<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;


class CategoryController extends Controller
{
    public function create()
    {
        return Inertia::render('Admin/EditFoodMenu/Categories/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:categories'],
        ]);

        $maxPlace = Category::max('place');
        if (!$maxPlace) {
            $request['place'] = 1;
        } else {

            $request['place'] = $maxPlace + 1;
        }

        Category::create([
            'name' => $request['name'],
            'place' => $request['place'],
        ]);


        return to_route('admin.edit-food-menu.index');
    }

    public function edit(Category $category)
    {
        return Inertia::render('Admin/EditFoodMenu/Categories/Edit', ['category' => $category]);
    }

    public function update(Request $request, Category $category)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255', Rule::unique('categories')->ignore($category->id)],
        ]);

        $category->name = $request->name;
        $category->save();
        return to_route('admin.edit-food-menu.index');
    }

    public function place(Request $request, Category $category)
    {
        $targetCategory = Category::where('place', $request['place'])->first();

        if (!$targetCategory || $category->place === $request['place']) {
            return to_route('admin.edit-food-menu.index');
        }

        $targetCategoryPlace = $targetCategory->place;
        $sourceCategoryPlace = $category->place;

        if ($targetCategoryPlace < $sourceCategoryPlace) {
            $restCategories = Category::where('place', '>=', $targetCategoryPlace)->where('id', '<>', $category->id)->orderBy('place')->get();

            $category->place = $targetCategoryPlace;
            $category->save();

            $i = $targetCategoryPlace + 1;
            foreach ($restCategories as $restCategory) {
                $restCategory->place = $i;
                $restCategory->save();
                $i++;
            }
        } else {
            $restCategories = Category::where('place', '<=', $targetCategoryPlace)->where('id', '<>', $category->id)->orderBy('place')->get();

            $category->place = $targetCategoryPlace;
            $category->save();

            $i = 1;
            foreach ($restCategories as $restCategory) {
                $restCategory->place = $i;
                $restCategory->save();
                $i++;
            }
        }
        return to_route('admin.edit-food-menu.index');
    }

    public function destroy(Category $category)
    {
        # A foodItemekhez tartozo kepek torlese miatt kell egyesevel torolni -> a FoodItem model deleted event igy meghivasra kerul
        foreach ($category->foodItems as $foodItem) {
            $foodItem->delete();
        }
        $category->delete();
    }
}
