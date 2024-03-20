import Card from '@/Components/Card';
import PrimaryButton from '@/Components/PrimaryButton';
import SvgButton from '@/Components/SvgButton';
import TextInput from '@/Components/TextInput';
import PageLayout from '@/Layouts/PageLayout';
import { RadioGroup } from '@headlessui/react';
import { CheckIcon, PhotoIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Head, router } from '@inertiajs/react';
import { useState, Fragment } from 'react';
import EmptyCart from './Partials/EmptyCart';
import InputError from '@/Components/InputError';

export default function Index({ cart, addresses }) {
  if (!cart || cart.cart_items.length === 0) {
    return <EmptyCart />;
  }

  const cartItems = cart.cart_items;

  const calculatePrice = () => {
    let price = 0;
    cartItems.forEach(cartItem => {
      price += cartItem.quantity * cartItem.price;
    });

    return price;
  };

  const [selectedAddress, setSelectedAddress] = useState(cart.address_id);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChangeQuantity = (e, cartItemId) => {
    router.patch(
      route('customer.cart-item.update', cartItemId),
      { quantity: e.target.value },
      { preserveScroll: true }
    );
  };

  const handlDeleteCartItem = cartItemId => {
    router.delete(
      route('customer.cart-item.destroy', cartItemId),
      {},
      { preserveScroll: true }
    );
  };

  const handleGoToCreateAddress = () => {
    router.get(route('customer.addresses.create'), {
      redirect: 'customer.cart.index',
    });
  };

  const handleConfirmOrder = () => {
    router.get(
      route('customer.cart.confirm-order'),
      {},
      {
        preserveState: true,
        onError: message => {
          setErrorMessage(message.error);
        },
      }
    );
  };

  const handleChangeAddress = addressId => {
    setSelectedAddress(addressId);
    router.patch(
      route('customer.cart.update', addressId),
      {},
      { preserveScroll: true }
    );
  };

  return (
    <PageLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Kosár
        </h2>
      }
    >
      <Head title="Étlap szerkesztése" />

      <Card className="p-4 sm:p-8">
        <h3 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Rendelt ételek
        </h3>

        <ul className="mt-4 divide-y divide-gray-400 dark:divide-gray-600">
          {cartItems.map(cartItem => (
            <li className="py-4 first:pt-0 last:pb-0" key={cartItem.id}>
              <div className="flex justify-between items-center">
                <div className="grow flex items-center gap-4 hover:cursor-grab">
                  {!cartItem.image_path && (
                    <PhotoIcon className="shrink-0 w-16 h-16 stroke-gray-300 dark:stroke-gray-700" />
                  )}
                  {cartItem.image_path && (
                    <img
                      className="shrink-0 w-16 h-16 rounded object-cover"
                      src={cartItem.image_path}
                    />
                  )}
                  <div className="grow grid sm:grid-cols-4 gap-4">
                    <p className="flex items-center text-sm overflow-hidden">
                      {cartItem.name}
                    </p>
                    {!cartItem.description && (
                      <p className="flex items-center text-sm overflow-hidden">
                        -
                      </p>
                    )}
                    {cartItem.description && (
                      <p className="flex items-center text-sm overflow-hidden">
                        {cartItem.description}
                      </p>
                    )}

                    <div className="flex sm:justify-end items-center gap-2">
                      <TextInput
                        className="w-14"
                        type="number"
                        id={`quantity_${cartItem.id}`}
                        name={`quantity_${cartItem.id}`}
                        value={cartItem.quantity}
                        onChange={e => handleChangeQuantity(e, cartItem.id)}
                      />
                      <p>Db</p>
                    </div>

                    <p className="flex sm:justify-end items-center text-sm overflow-hidden">
                      {cartItem.quantity * cartItem.price} Ft
                    </p>
                  </div>
                </div>
                <div className="ms-4 flex items-center">
                  <SvgButton
                    onClick={() => handlDeleteCartItem(cartItem.id)}
                    title="Étel törlése"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </SvgButton>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <hr className="mt-6 border-2 border-gray-400 dark:border-gray-600" />
        <p className="mt-8 font-bold text-xl text-gray-800 dark:text-gray-200 leading-tight text-end">
          Összesen: {calculatePrice()} Ft
        </p>
      </Card>

      <Card className="mt-8 pt-4 sm:pt-8 pb-4">
        <h3 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight px-4 sm:px-8">
          Szállítási cím kiválasztása
        </h3>
        <div className="mt-8 mb-8 px-4 sm:px-8">
          <PrimaryButton onClick={handleGoToCreateAddress}>
            + Új szállítási cím
          </PrimaryButton>
        </div>

        {addresses.length > 0 && (
          <RadioGroup value={selectedAddress} onChange={handleChangeAddress}>
            <ul className="mt-4 divide-y divide-gray-400 dark:divide-gray-600">
              {addresses.map(address => (
                <RadioGroup.Option
                  key={address.id}
                  value={address.id}
                  as={Fragment}
                >
                  {({ checked }) => (
                    <li
                      className={`flex items-center justify-between cursor-pointer p-4 sm:p-8 ${
                        checked
                          ? 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                          : ''
                      }`}
                    >
                      <div>
                        <p className="flex items-center overflow-hidden font-semibold text-lg">
                          Név: {address.last_name} {address.first_name}
                        </p>
                        <p className="flex items-center overflow-hidden">
                          Cím: {address.zipcode}. {address.city},{' '}
                          {address.street}
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
                          <p className="mt-2">Elsődleges szállítási cím</p>
                        )}
                      </div>
                      {checked && (
                        <div>
                          <CheckIcon className="w-8 h-8 stroke-gray-600 dark:stroke-gray-400" />
                        </div>
                      )}
                    </li>
                  )}
                </RadioGroup.Option>
              ))}
            </ul>
          </RadioGroup>
        )}
      </Card>
      <InputError className="mt-2" message={errorMessage} />

      <div className="mt-8 px-4 sm:px-0 text-end">
        <PrimaryButton onClick={handleConfirmOrder}>Megrendelés</PrimaryButton>
      </div>
    </PageLayout>
  );
}
