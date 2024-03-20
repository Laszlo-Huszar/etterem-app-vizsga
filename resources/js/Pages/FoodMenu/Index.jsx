import PrimaryButton from '@/Components/PrimaryButton';
import PageLayout from '@/Layouts/PageLayout';
import { PhotoIcon } from '@heroicons/react/24/outline';
import { Head, router, usePage } from '@inertiajs/react';

export default function FoodMenu({ categories }) {
  const handleStoreCartItem = foodItemId => {
    router.post(
      route('customer.cart-item.store', foodItemId),
      {},
      { preserveScroll: true }
    );
  };

  return (
    <PageLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Étlap
        </h2>
      }
    >
      <Head title="Étlap" />

      {categories.length > 0 && (
        <ul className="flex flex-col gap-6">
          {categories.map(category => (
            <li
              className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
              key={category.id}
            >
              <h3 className="font-semibold text-2xl text-gray-800 dark:text-gray-200 leading-tight">
                {category.name}
              </h3>
              {category.food_items.length > 0 && (
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-8">
                  {category.food_items.map(foodItem => (
                    <li
                      className="flex flex-col border border-gray-400 dark:border-gray-600 rounded overflow-hidden"
                      key={foodItem.id}
                    >
                      {!foodItem.image_path && (
                        <div>
                          <PhotoIcon className="h-full w-full aspect-square stroke-gray-300 dark:stroke-gray-700" />
                        </div>
                      )}
                      {foodItem.image_path && (
                        <div>
                          <img
                            className="object-cover w-full h-full aspect-square"
                            src={foodItem.image_path}
                          />
                        </div>
                      )}
                      <div className="grow flex flex-col gap-2 p-4">
                        <p className="text-xl font-semibold">{foodItem.name}</p>
                        <p className="grow">{foodItem.description}</p>
                        <p className="text-xl font-bold">{foodItem.price} Ft</p>
                        <div className="">
                          <PrimaryButton
                            onClick={() => handleStoreCartItem(foodItem.id)}
                          >
                            Kosárba
                          </PrimaryButton>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </PageLayout>
  );
}
