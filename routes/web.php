<?php

use App\Http\Controllers\FoodMenuController;
use App\Http\Controllers\ProfileController;
use App\Models\FoodItem;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Str;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/





Route::get('/', function (Request $request) {

    $foodItems = FoodItem::all();

    $pool = $foodItems->toArray();
    $arr = [];

    for ($i = 0; $i < 3; $i++) {
        $rand = rand(0, count($pool) - 1);
        $arr[] = $pool[$rand];

        if (env('FILESYSTEM_DISK') === 's3') {
            $arr[$i]["image_path"] =  $imageTemporaryUrl = Storage::temporaryUrl($arr[$i]["image_path"], now()->addMinutes(1));
        } else if (env('FILESYSTEM_DISK') === 'public') {
            $arr[$i]["image_path"] = 'http://localhost/storage/' . $arr[$i]["image_path"];
        }

        array_splice($pool, $rand, 1);
    }

    if (env('FILESYSTEM_DISK') === 's3') {
        $imageTemporaryUrl = Storage::temporaryUrl('welcome-images/hero.jpg', now()->addMinutes(1));
    } else if (env('FILESYSTEM_DISK') === 'public') {
        $imageTemporaryUrl = 'http://localhost/storage/' . 'welcome-images/hero.jpg';
    }

    return Inertia::render('Welcome', ['heroImageUrl' => $imageTemporaryUrl, 'foodItems' => $arr]);
})->name('home');

Route::resource('food-menu', FoodMenuController::class)->only('index');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
require __DIR__ . '/admin.php';
require __DIR__ . '/customer.php';
require __DIR__ . '/employee.php';
