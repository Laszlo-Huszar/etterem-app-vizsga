import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextArea from '@/Components/TextArea';
import TextInput from '@/Components/TextInput';
import PageLayout from '@/Layouts/PageLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Edit({ address }) {
  const [errorMessage, setErrorMessage] = useState(null);

  const { data, setData, errors, patch, processing } = useForm({
    last_name: address.last_name,
    first_name: address.first_name,
    phone: address.phone,
    zipcode: address.zipcode,
    city: address.city,
    street: address.street,
    note: address.note ? address.note : '',
    default: address.default === 1 ? true : false,
  });

  const submit = e => {
    e.preventDefault();
    patch(route('customer.addresses.update', address.id), {
      onError: message => setErrorMessage(message.error),
    });
  };

  return (
    <PageLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Új Cím
        </h2>
      }
    >
      <Head title="Új Cím" />
      <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg sm:max-w-lg sm:mx-auto">
        <form className="space-y-6" onSubmit={submit}>
          <InputError className="mt-2" message={errorMessage} />

          <div className="flex flex-col gap-6 sm:flex-row">
            <div className="grow">
              <InputLabel htmlFor="last_name" value="Vezetéknév*" />

              <TextInput
                className="mt-1 block w-full"
                id="last_name"
                name="last_name"
                value={data.last_name}
                onChange={e => setData('last_name', e.target.value)}
                isFocused
              />

              <InputError className="mt-2" message={errors.last_name} />
            </div>

            <div className="grow">
              <InputLabel htmlFor="first_name" value="Keresztnév*" />

              <TextInput
                className="mt-1 block w-full"
                id="first_name"
                name="first_name"
                value={data.first_name}
                onChange={e => setData('first_name', e.target.value)}
              />

              <InputError className="mt-2" message={errors.first_name} />
            </div>
          </div>

          <div>
            <InputLabel htmlFor="phone" value="Telefonszám*" />
            <div className="flex items-center gap-2">
              <span>+36</span>
              <TextInput
                className="mt-1 block w-full"
                id="phone"
                name="phone"
                value={data.phone}
                onChange={e => setData('phone', e.target.value)}
              />
            </div>

            <InputError className="mt-2" message={errors.phone} />
          </div>
          <div className="flex flex-col gap-6 sm:flex-row">
            <div className="sm:max-w-32">
              <InputLabel htmlFor="zipcode" value="Kerület*" />

              <TextInput
                className="mt-1 block w-full"
                id="zipcode"
                name="zipcode"
                value={data.zipcode}
                onChange={e => setData('zipcode', e.target.value)}
              />

              <InputError className="mt-2" message={errors.zipcode} />
            </div>

            <div className="grow">
              <InputLabel htmlFor="city" value="Város*" />

              <TextInput
                className="mt-1 block w-full"
                id="city"
                name="city"
                value={data.city}
                onChange={e => setData('city', e.target.value)}
              />

              <InputError className="mt-2" message={errors.city} />
            </div>
          </div>
          <div>
            <InputLabel htmlFor="street" value="Utca*" />

            <TextInput
              className="mt-1 block w-full"
              id="street"
              name="street"
              value={data.street}
              onChange={e => setData('street', e.target.value)}
            />

            <InputError className="mt-2" message={errors.street} />
          </div>

          <div>
            <InputLabel htmlFor="note" value="Szállítási megjegyzés" />

            <TextArea
              id="note"
              name="note"
              value={data.note}
              onChange={e => setData('note', e.target.value)}
              className="mt-1 block w-full"
            />

            <InputError message={errors.note} className="mt-2" />
          </div>

          <div>
            <label className="flex items-center">
              <Checkbox
                name="default"
                checked={data.default}
                onChange={e => setData('default', e.target.checked)}
              />
              <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">
                Alapértelmezett szállítási cím
              </span>
            </label>
          </div>

          <div className="mt-6 flex justify-end">
            <SecondaryButton
              onClick={() => router.get(route('customer.addresses.index'))}
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
