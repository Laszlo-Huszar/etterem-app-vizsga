import Card from '@/Components/Card';
import PageLayout from '@/Layouts/PageLayout';
import { Head } from '@inertiajs/react';

export default function Index({ orders }) {
  const printDate = createdAt => {
    const myDate = new Date(createdAt);
    return myDate.toLocaleString('hu');
  };

  return (
    <PageLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Rendeléseim
        </h2>
      }
    >
      <Head title="Rendeléseim" />

      {orders && orders.length > 0 && (
        <ul>
          {orders.map(order => (
            <li className="py-4 first:pt-0 last:pb-0" key={order.id}>
              <Card className="p-4 sm:p-8">
                <h3 className='className="mt-4 font-semibold text-lg text-gray-800 dark:text-gray-200 leading-tight'>
                  Dátum:
                </h3>
                <p>{printDate(order.created_at)}</p>
                <h3 className='mt-4 className="mt-4 font-semibold text-lg text-gray-800 dark:text-gray-200 leading-tight'>
                  Rendelésszám:
                </h3>
                <p>{order.order_number}</p>

                <h3 className="mt-4 font-semibold text-lg text-gray-800 dark:text-gray-200 leading-tight">
                  Tételek
                </h3>
                <ul>
                  {order.order_items.map(orderItem => (
                    <li key={orderItem.id}>{orderItem.food_name}</li>
                  ))}
                </ul>

                <h3 className="mt-4 font-semibold text-lg text-gray-800 dark:text-gray-200 leading-tight">
                  Szállítási cím
                </h3>

                <div className="">
                  <p className="flex items-center gap-2 overflow-hidden font-semibold text-lg">
                    Név: {order.order_address.last_name}{' '}
                    {order.order_address.first_name}
                  </p>
                  <p className="flex items-center overflow-hidden">
                    Cím: {order.order_address.zipcode}.{' '}
                    {order.order_address.city}, {order.order_address.street}
                  </p>
                  <p className="flex items-center overflow-hidden">
                    Tel.: +36 {order.order_address.phone}
                  </p>
                  {order.order_address.note && (
                    <p className="flex items-center overflow-hidden">
                      Megjegyzés: {order.order_address.note}
                    </p>
                  )}
                </div>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </PageLayout>
  );
}
