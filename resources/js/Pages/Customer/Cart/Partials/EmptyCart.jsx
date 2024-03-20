import PageLayout from '@/Layouts/PageLayout';
import { Head, Link } from '@inertiajs/react';

export default function EmptyCart() {
  return (
    <PageLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Kosár
        </h2>
      }
    >
      <Head title="Étlap szerkesztése" />

      <p>
        A kosár üres,{' '}
        <Link
          className="text-indigo-400 dark:text-indigo-600"
          href={route('food-menu.index')}
        >
          rendelj
        </Link>{' '}
        valamit!
      </p>
    </PageLayout>
  );
}
