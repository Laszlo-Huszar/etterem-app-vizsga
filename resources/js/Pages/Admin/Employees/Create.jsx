import Card from '@/Components/Card';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import PageLayout from '@/Layouts/PageLayout';
import { Listbox } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/24/outline';
import { Head, router, useForm } from '@inertiajs/react';
import { Fragment, useState } from 'react';

export default function Create() {
  const [selectedPosition, setSelectedPosition] = useState('operator');

  const { data, setData, errors, post, processing } = useForm({
    name: '',
    email: '',
    position: selectedPosition,
  });

  const submit = e => {
    e.preventDefault();
    post(route('admin.employees.store'));
  };

  const handleSetPosition = position => {
    setSelectedPosition(position);
    setData('position', position);
  };

  return (
    <PageLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Új Munkavállalói fiók
        </h2>
      }
    >
      <Head title="Új Munkavállalói fiók" />

      <Card className="p-4 sm:p-8 max-w-xl mx-auto">
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
            <InputLabel htmlFor="email" value="Email" />

            <TextInput
              id="email"
              type="email"
              name="email"
              value={data.email}
              onChange={e => setData('email', e.target.value)}
              className="mt-1 block w-full"
            />

            <InputError message={errors.email} className="mt-2" />
          </div>

          <div>
            <InputLabel htmlFor="position" value="Beosztás" />

            <Listbox
              className="mt-1 mb-6 relative h-48"
              as="div"
              value={selectedPosition}
              onChange={handleSetPosition}
            >
              <Listbox.Button className="flex justify-between items-center border-2 border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm p-4 w-full outline-none">
                <span>{selectedPosition}</span>
                <ChevronUpDownIcon className="w-6 h-6" />
              </Listbox.Button>
              <Listbox.Options className="mt-1 absolute h-30 py-4 overflow-y-auto border-2 border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm outline-none w-full">
                <Listbox.Option value="operator" as={Fragment}>
                  {({ active, selected }) => (
                    <li
                      className={`px-4 py-2 ${
                        active ? 'bg-indigo-400 dark:bg-indigo-600' : ''
                      }`}
                    >
                      operator
                    </li>
                  )}
                </Listbox.Option>
                <Listbox.Option value="courier" as={Fragment}>
                  {({ active, selected }) => (
                    <li
                      className={`px-4 py-2 ${
                        active ? 'bg-indigo-400 dark:bg-indigo-600' : ''
                      }`}
                    >
                      courier
                    </li>
                  )}
                </Listbox.Option>
              </Listbox.Options>
            </Listbox>
          </div>

          <div className="mt-6 flex justify-end">
            <SecondaryButton
              onClick={() => router.get(route('admin.employees.index'))}
            >
              Mégsem
            </SecondaryButton>

            <PrimaryButton className="ms-3" disabled={processing}>
              Ment
            </PrimaryButton>
          </div>
        </form>
      </Card>
    </PageLayout>
  );
}
