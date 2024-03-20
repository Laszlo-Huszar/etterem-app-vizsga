import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import PageLayout from '@/Layouts/PageLayout';

export default function Login({ status, canResetPassword }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  useEffect(() => {
    return () => {
      reset('password');
    };
  }, []);

  const submit = e => {
    e.preventDefault();

    post(route('login'));
  };

  return (
    <PageLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Belépés
        </h2>
      }
    >
      <Head title="Belépés" />

      <div className="p-4 sm:p-8 border-y sm:border border-gray-600 shadow sm:rounded-lg sm:max-w-lg sm:mx-auto">
        <p className="font-bold text-lg text-gray-800 dark:text-gray-200">
          Belépés Admisztrátorként
        </p>
        <p className="mt-2 ms-4">
          Email: admin@test.com
          <br />
          Jelszó: password
        </p>
      </div>

      <div className="mt-12 p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg sm:max-w-lg sm:mx-auto">
        <form onSubmit={submit}>
          <div>
            <InputLabel htmlFor="email" value="Email" />

            <TextInput
              id="email"
              type="email"
              name="email"
              value={data.email}
              className="mt-1 block w-full"
              autoComplete="username"
              isFocused={true}
              onChange={e => setData('email', e.target.value)}
            />

            <InputError message={errors.email} className="mt-2" />
          </div>

          <div className="mt-4">
            <InputLabel htmlFor="password" value="Jelszó" />

            <TextInput
              id="password"
              type="password"
              name="password"
              value={data.password}
              className="mt-1 block w-full"
              autoComplete="current-password"
              onChange={e => setData('password', e.target.value)}
            />

            <InputError message={errors.password} className="mt-2" />
          </div>

          <div className="flex items-center justify-end mt-4">
            <PrimaryButton className="ms-4" disabled={processing}>
              Belépés
            </PrimaryButton>
          </div>
        </form>
      </div>
    </PageLayout>
  );
}
