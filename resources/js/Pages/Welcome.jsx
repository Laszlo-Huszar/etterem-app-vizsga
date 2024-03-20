import Card from '@/Components/Card';
import PrimaryButton from '@/Components/PrimaryButton';
import PageLayout from '@/Layouts/PageLayout';
import { router } from '@inertiajs/react';

export default function Welcome({ heroImageUrl, foodItems }) {
  const handleToFoodMenu = () => {
    router.get(route('food-menu.index'));
  };

  return (
    <PageLayout>
      <Card>
        <div className="flex flex-col">
          <div className="top-0">
            <img
              className="w-full max-h-[50vh] object-cover aspect-video"
              src={heroImageUrl}
              alt="hero"
            />
          </div>
          <div className="bg-gray-800/95 z-50 p-4 sm:p-8">
            <h1 className="mt-12 text-4xl font-semibold">Napi ajánlataink</h1>
            <ul className="mt-8 grid md:grid-cols-3 2xl:grid-cols-3 gap-4">
              {foodItems.map(foodItem => (
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
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex justify-end">
              <PrimaryButton onClick={handleToFoodMenu}>
                Tovább az étlaphoz
              </PrimaryButton>
            </div>
          </div>
        </div>
      </Card>

      <Card className="mt-8 p-4 sm:p-8">
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores
          deleniti necessitatibus et dicta maxime optio vero reprehenderit amet
          voluptatibus, nostrum soluta, voluptatem porro repudiandae cum? Nam
          facere perspiciatis laudantium impedit!
        </p>
      </Card>
    </PageLayout>
  );
}
