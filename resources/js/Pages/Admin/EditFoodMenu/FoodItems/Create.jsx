import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextArea from '@/Components/TextArea';
import TextInput from '@/Components/TextInput';
import PageLayout from '@/Layouts/PageLayout';
import { Head, router, useForm } from '@inertiajs/react';

export default function Create({ categoryId }) {
  const { data, setData, errors, post, processing } = useForm({
    category_id: categoryId,
    name: '',
    description: '',
    price: '',
    image: null,
  });

  const submit = e => {
    e.preventDefault();
    post(route('admin.edit-food-menu.food-items.store'));
  };

  return (
    <PageLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Új Étel
        </h2>
      }
    >
      <Head title="Új Étel" />
      <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg sm:max-w-lg sm:mx-auto">
        <form className="space-y-6" onSubmit={submit}>
          <div>
            <InputLabel htmlFor="name" value="Név" />

            <TextInput
              id="name"
              type="text"
              name="name"
              value={data.name}
              onChange={e => setData('name', e.target.value)}
              className="mt-1 block w-full"
              isFocused
            />

            <InputError message={errors.name} className="mt-2" />
          </div>

          <div>
            <InputLabel htmlFor="description" value="Leírás" />

            <TextArea
              id="description"
              type="text"
              name="description"
              value={data.description}
              onChange={e => setData('description', e.target.value)}
              className="mt-1 block w-full"
            />

            <InputError message={errors.description} className="mt-2" />
          </div>

          <div>
            <InputLabel htmlFor="price" value="Ár" />

            <TextInput
              id="price"
              type="number"
              name="price"
              value={data.price}
              onChange={e => setData('price', e.target.value)}
              className="mt-1 block w-full"
            />

            <InputError message={errors.price} className="mt-2" />
          </div>

          <div>
            <InputLabel htmlFor="image" value="Kép" />

            <TextInput
              id="image"
              type="file"
              name="image"
              onChange={e => setData('image', e.target.files[0])}
              className="mt-1 block w-full"
            />

            <InputError message={errors.image} className="mt-2" />
          </div>

          <div className="mt-6 flex justify-end">
            <SecondaryButton
              onClick={() => router.get(route('admin.edit-food-menu.index'))}
            >
              Mégsem
            </SecondaryButton>

            <PrimaryButton className="ms-3" disabled={processing}>
              Ment
            </PrimaryButton>
          </div>
        </form>
      </div>
    </PageLayout>
  );
}
