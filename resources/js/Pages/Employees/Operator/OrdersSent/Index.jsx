import Card from '@/Components/Card';
import PageLayout from '@/Layouts/PageLayout';
import { Head, router } from '@inertiajs/react';
import { useEffect } from 'react';

export default function Index({ orders }) {
  useEffect(() => {
    window.Echo.listen('employee', 'OnOrderDelivery', e => {
      router.reload();
    });
  }, []);

  return (
    <PageLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Szállítás alatt lévő rendelések
        </h2>
      }
    >
      <Head title="Szállítás alatt lévő rendelések" />
      <Card className="hidden sm:grid grid-cols-4 gap-4 sm:px-8 py-4 text-gray-800 dark:text-gray-200 font-semibold">
        <p>Rsz.</p>
        <p>Cím</p>
        <p>Ételek</p>
        <p>Futár</p>
      </Card>
      <ul className="mt-2 space-y-2">
        {orders.map(order => (
          <li key={order.id}>
            <Card className="grow grid sm:grid-cols-4 items-center gap-4 p-4 sm:p-8">
              <div>
                <p className="block sm:hidden text-gray-800 dark:text-gray-200 font-semibold">
                  Rsz.:
                </p>
                <p className="overflow-hidden">{order.order_number}</p>
              </div>
              <div>
                <p className="block sm:hidden text-gray-800 dark:text-gray-200 font-semibold">
                  Cím:
                </p>
                <div>
                  <p className="overflow-hidden">
                    {order.order_address.last_name},{' '}
                    {order.order_address.first_name}
                  </p>
                  <p className="overflow-hidden">
                    {order.order_address.zipcode}. {order.order_address.city},{' '}
                    {order.order_address.street}
                  </p>
                  <p className="overflow-hidden">
                    +36{order.order_address.phone}
                  </p>
                </div>
              </div>
              <div>
                <p className="block sm:hidden text-gray-800 dark:text-gray-200 font-semibold">
                  Ételek:
                </p>
                <ul>
                  {order.order_items.map(orderItem => (
                    <li key={orderItem.id}>{orderItem.food_name}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="block sm:hidden text-gray-800 dark:text-gray-200 font-semibold">
                  Futár:
                </p>
                <p>{order.latest_order_status.target_employee.user.name}</p>
              </div>
            </Card>
          </li>
        ))}
      </ul>
    </PageLayout>
  );
}
