import Card from '@/Components/Card';
import PrimaryButton from '@/Components/PrimaryButton';
import SvgButton from '@/Components/SvgButton';
import PageLayout from '@/Layouts/PageLayout';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Head, router } from '@inertiajs/react';

export default function Index({ addresses }) {
  const handleCreateAddress = () => {
    router.get(route('customer.addresses.create'));
  };

  const handleEditAddress = addressId => {
    router.get(route('customer.addresses.edit', addressId));
  };

  const handleDeleteAddress = addressId => {
    router.delete(route('customer.addresses.destroy', addressId));
  };

  return (
    <PageLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Szállítási címek
        </h2>
      }
    >
      <Head title="Szállítási címek" />

      <div className="px-4 sm:px-0">
        <PrimaryButton onClick={handleCreateAddress}>
          + Új szállítási cím
        </PrimaryButton>
      </div>

      <ul className="mt-6 space-y-6">
        {addresses.map(address => (
          <li key={address.id}>
            <Card className="flex flex-wrap justify-between items-center p-4 sm:p-8">
              <div className="gap-2">
                <p className="flex items-center gap-2 overflow-hidden font-semibold text-lg">
                  Név: {address.last_name} {address.first_name}
                </p>
                <p className="flex items-center overflow-hidden">
                  Cím: {address.zipcode}. {address.city}, {address.street}
                </p>
                <p className="flex items-center overflow-hidden">
                  Tel.: +36 {address.phone}
                </p>
                {address.note && (
                  <p className="flex items-center overflow-hidden">
                    Megjegyzés: {address.note}
                  </p>
                )}
                {address.default === 1 && (
                  <p className="mt-4">Elsődleges szállítási cím</p>
                )}
              </div>

              <div className="flex items-center">
                <SvgButton
                  onClick={() => handleEditAddress(address.id)}
                  title="Cím szerkesztése"
                >
                  <PencilSquareIcon className="w-6 h-6" />
                </SvgButton>
                <SvgButton
                  onClick={() => handleDeleteAddress(address.id)}
                  title="Cím törlése"
                >
                  <TrashIcon className="w-6 h-6" />
                </SvgButton>
              </div>
            </Card>
          </li>
        ))}
      </ul>
    </PageLayout>
  );
}
