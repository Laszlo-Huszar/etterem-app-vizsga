import PrimaryButton from '@/Components/PrimaryButton';
import PageLayout from '@/Layouts/PageLayout';
import { Head, router } from '@inertiajs/react';
import Card from '@/Components/Card';
import {
  PencilSquareIcon,
  PhotoIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import SvgButton from '@/Components/SvgButton';
import DragableSvgButton from '@/Components/DragableSvgButton';
import { useState } from 'react';
import DeleteCategoryModal from './Partials/DeleteCategoryModal';

export default function Index({ categories }) {
  const [showDeleteCategoryModal, setShowDeleteCategoryModal] = useState({
    isShow: false,
    categoryId: 0,
    categoryName: '',
  });

  // ----- Categories -----

  const handleCreateCategory = () => {
    router.get(route('admin.edit-food-menu.categories.create'));
  };

  const handleEditCategory = categoryId => {
    router.get(route('admin.edit-food-menu.categories.edit', categoryId));
  };

  const handleShowDeleteCategory = (categoryId, categoryName) => {
    setShowDeleteCategoryModal({ isShow: true, categoryId, categoryName });
  };

  const handleDeleteCategory = categoryId => {
    router.delete(route('admin.edit-food-menu.categories.destroy', categoryId));
    setShowDeleteCategoryModal(prev => ({ ...prev, isShow: false }));
  };

  const handleCategoryDragStart = (e, categoryId) => {
    e.dataTransfer.setData('application/category', categoryId);
  };

  const handleCategoryDragOver = e => {
    const isAllowed = e.dataTransfer.types.includes('application/category');
    if (isAllowed) {
      e.preventDefault();
    }
  };

  const handleCategoryDrop = (e, place) => {
    e.preventDefault();

    const categoryId = e.dataTransfer.getData('application/category');
    router.post(
      route('admin.edit-food-menu.categories.place', categoryId),
      {
        place,
      },
      {
        preserveScroll: true,
      }
    );
  };

  // ----- FoodItems -----

  const handleCreateFoodItem = categoryId => {
    router.get(route('admin.edit-food-menu.food-items.create', categoryId));
  };

  const handleEditFoodItem = foodItemId => {
    router.get(route('admin.edit-food-menu.food-items.edit', foodItemId));
  };

  const handleDeleteFoodItem = foodItemId => {
    router.delete(route('admin.edit-food-menu.food-items.destroy', foodItemId));
  };

  const handleFoodItemDragStart = (e, categoryId, foodItemId) => {
    e.dataTransfer.setData(`application/food-item_${categoryId}`, foodItemId);
  };

  const handleFoodItemDragOver = (e, categoryId) => {
    const isAllowed = e.dataTransfer.types.includes(
      `application/food-item_${categoryId}`
    );
    if (isAllowed) {
      e.preventDefault();
    }
  };

  const handleFoodItemDrop = (e, categoryId, place) => {
    const foodItemId = e.dataTransfer.getData(
      `application/food-item_${categoryId}`
    );
    router.post(
      route('admin.edit-food-menu.food-items.place', foodItemId),
      {
        place,
      },
      {
        preserveScroll: true,
      }
    );
  };

  return (
    <PageLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Étlap szerkesztése
        </h2>
      }
    >
      <Head title="Étlap szerkesztése" />

      <DeleteCategoryModal
        show={showDeleteCategoryModal.isShow}
        setShow={e =>
          setShowDeleteCategoryModal(prev => ({ ...prev, isShow: e }))
        }
        categoryId={showDeleteCategoryModal.categoryId}
        categoryName={showDeleteCategoryModal.categoryName}
        onOk={handleDeleteCategory}
      />

      <div className="px-4 sm:px-0">
        <PrimaryButton onClick={handleCreateCategory}>
          + Új kategória
        </PrimaryButton>
      </div>

      <ul className="mt-6 space-y-6">
        {categories.map(category => (
          <li key={category.id}>
            <Card className="py-4">
              <div className="flex flex-wrap justify-between items-center hover:bg-gray-200 dark:hover:bg-gray-700 pe-1 sm:pe-4">
                <div
                  className="grow flex items-center hover:cursor-grab px-4 py-2 sm:px-8 sm:py-4"
                  draggable
                  onDragStart={e => handleCategoryDragStart(e, category.id)}
                  onDragOver={handleCategoryDragOver}
                  onDrop={e => handleCategoryDrop(e, category.place)}
                >
                  <DragableSvgButton className="w-[12px] h-[18px] hover:cursor-grab" />
                  <h3 className="ms-4 font-semibold text-xl text-gray-800 dark:text-gray-200 overflow-hidden">
                    {category.name}
                  </h3>
                </div>
                <div className="flex items-center">
                  <SvgButton
                    onClick={() => handleCreateFoodItem(category.id)}
                    title="Új étel hozzáadása a kategóriához"
                  >
                    <PlusIcon className="w-6 h-6" />
                  </SvgButton>
                  <SvgButton
                    onClick={() => handleEditCategory(category.id)}
                    title="Kategória szerkesztése"
                  >
                    <PencilSquareIcon className="w-6 h-6" />
                  </SvgButton>
                  <SvgButton
                    onClick={() =>
                      handleShowDeleteCategory(category.id, category.name)
                    }
                    title="Kategória törlése"
                  >
                    <TrashIcon className="w-6 h-6" />
                  </SvgButton>
                </div>
              </div>
              {category.food_items.length > 0 && (
                <ul className="mt-8 divide-y divide-gray-400 dark:divide-gray-600">
                  {category.food_items.map(foodItem => (
                    <li
                      key={foodItem.id}
                      className="hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                      <div className="flex justify-between items-center">
                        <div
                          className="grow flex  items-center gap-4 hover:cursor-grab px-4 py-2 sm:px-8 sm:py-4"
                          draggable
                          onDragStart={e =>
                            handleFoodItemDragStart(e, category.id, foodItem.id)
                          }
                          onDragOver={e =>
                            handleFoodItemDragOver(e, category.id)
                          }
                          onDrop={e =>
                            handleFoodItemDrop(e, category.id, foodItem.place)
                          }
                        >
                          <DragableSvgButton className="shrink-0 w-[10px] h-[15px]" />
                          {!foodItem.image_path && (
                            <PhotoIcon className="shrink-0 w-12 h-12 stroke-gray-300 dark:stroke-gray-700" />
                          )}
                          {foodItem.image_path && (
                            <img
                              className="shrink-0 w-12 h-12 rounded object-cover"
                              src={foodItem.image_path}
                            />
                          )}
                          <div className="grow grid sm:grid-cols-3 gap-4">
                            <p className="flex items-center text-sm overflow-hidden">
                              {foodItem.name}
                            </p>
                            {!foodItem.description && (
                              <p className="flex items-center text-sm overflow-hidden">
                                -
                              </p>
                            )}
                            {foodItem.description && (
                              <p className="flex items-center text-sm overflow-hidden">
                                {foodItem.description}
                              </p>
                            )}
                            <p className="flex items-center text-sm overflow-hidden">
                              {foodItem.price} Ft
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center pe-2 sm:pe-4">
                          <SvgButton
                            onClick={() => handleEditFoodItem(foodItem.id)}
                            title="Étel szerkesztése"
                          >
                            <PencilSquareIcon className="w-5 h-5" />
                          </SvgButton>
                          <SvgButton
                            onClick={() => handleDeleteFoodItem(foodItem.id)}
                            title="Étel törlése"
                          >
                            <TrashIcon className="w-5 h-5" />
                          </SvgButton>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          </li>
        ))}
      </ul>
    </PageLayout>
  );
}
