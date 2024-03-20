import Card from '@/Components/Card';
import DangerButton from '@/Components/DangerButton';
import SecondaryButton from '@/Components/SecondaryButton';
import PageLayout from '@/Layouts/PageLayout';
import { Head, router } from '@inertiajs/react';

export default function ConfirmOrder({ cart }) {
  const cartItems = cart.cart_items;
  const address = cart.address;

  const calculatePrice = () => {
    let price = 0;
    cartItems.forEach(cartItem => {
      price += cartItem.quantity * cartItem.price;
    });

    return price;
  };

  const handleOrder = () => {
    router.post(route('customer.cart.order'));
  };

  return (
    <PageLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Rendelés megerősítése
        </h2>
      }
    >
      <Head title="Rendelés megerősítése" />

      <Card className="p-4 sm:p-8">
        <h3 className="font-semibold text-2xl text-gray-800 dark:text-gray-200 leading-tight mb-8">
          Rendelés
        </h3>
        <ul className="divide-y dark:divide-gray-600">
          {cartItems.map(cartItem => (
            <li
              className="grid grid-cols-1 gap-1 sm:grid-cols-4 py-4"
              key={cartItem.id}
            >
              <span>{cartItem.name}</span>
              <span>{cartItem.quantity} db</span>
              <span>{cartItem.price} Ft / db</span>
              <span>{cartItem.price * cartItem.quantity} Ft</span>
            </li>
          ))}
        </ul>
        <hr className="my-8 border-2 dark:border-gray-500" />
        <div className="grid grid-cols-1 sm:grid-cols-4">
          <span className="col-span-3 text-xl font-bold ">Összesen</span>
          <span className="col-span-1 text-xl font-bold text-indigo-400 dark:text-indigo-600">
            {calculatePrice()} Ft
          </span>
        </div>
      </Card>
      <Card className="mt-6 p-4 sm:p-8">
        <h3 className="font-semibold text-2xl text-gray-800 dark:text-gray-200 leading-tight mb-8">
          Szállítási cím
        </h3>
        <div>
          <p>
            {address.last_name} {address.first_name}
          </p>
          <p>
            {address.zipcode}. {address.city}
          </p>
          <p>{address.street}</p>
          <p>Tel.: +36{address.phone}</p>
          {address.note && <p>Szállítási megjegyzés: {address.note}</p>}
        </div>
      </Card>

      <div className="mt-12 flex justify-end gap-4">
        <SecondaryButton
          onClick={() => router.get(route('customer.cart.index'))}
        >
          Mégsem
        </SecondaryButton>
        <DangerButton onClick={handleOrder}>
          Rendelés véglegesítése
        </DangerButton>
      </div>
    </PageLayout>
  );
}
