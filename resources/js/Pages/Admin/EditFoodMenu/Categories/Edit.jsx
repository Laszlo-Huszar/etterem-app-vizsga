import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import PageLayout from '@/Layouts/PageLayout';
import { Head, router, useForm } from '@inertiajs/react';

export default function Edit({ category }) {
  const { data, setData, errors, patch, processing } = useForm({
    name: category.name,
  });

  const submit = e => {
    e.preventDefault();
    patch(route('admin.edit-food-menu.categories.update', category.id));
  };

  return (
    <PageLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Kategória szerkesztése
        </h2>
      }
    >
      <Head title="Kategória szerkesztése" />

      <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg sm:max-w-lg sm:mx-auto">
        <form onSubmit={submit}>
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
