import Card from '@/Components/Card';
import SvgButton from '@/Components/SvgButton';
import PageLayout from '@/Layouts/PageLayout';
import { InboxArrowDownIcon } from '@heroicons/react/24/outline';
import { Head, router } from '@inertiajs/react';
import { useEffect } from 'react';

export default function Index({ orders }) {
  const calculatePrice = orderItems => {
    let price = 0;
    orderItems.forEach(orderItem => {
      price += orderItem.quantity * orderItem.price;
    });

    return price;
  };

  const handleSenToDelivered = orderId => {
    router.post(
      route('employee.courier.store', orderId),
      {},
      {
        preserveScroll: true,
      }
    );
  };

  useEffect(() => {
    window.Echo.listen('employee', 'OnOrderDelivery', e => {
      router.reload();
    });
  }, []);

  return (
    <PageLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Kiszállítandó rendelések
        </h2>
      }
    >
      <Head title="Kiszállítandó rendelések" />
      <Card className="hidden sm:flex sm:items-center sm:gap-4 sm:px-8 py-4 text-gray-800 dark:text-gray-200 font-semibold">
        <div className="grow sm:grid grid-cols-4 gap-4">
          <p>Rsz.</p>
          <p>Cím</p>
          <p>Ételek</p>
          <p>Ár</p>
        </div>
        <div className="w-6 h-6 p-5"></div>
      </Card>
      <ul className="mt-2 space-y-2">
        {orders.map(order => (
          <li key={order.id}>
            <Card className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 sm:p-8">
              <div className="grid sm:grid-cols-4 sm:items-center gap-4">
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
                    Ár:
                  </p>
                  <p>{calculatePrice(order.order_items)} Ft</p>
                </div>
              </div>
              <div>
                <SvgButton
                  title="Kiszállítva"
                  onClick={() => handleSenToDelivered(order.id)}
                >
                  <InboxArrowDownIcon className="w-6 h-6" />
                </SvgButton>
              </div>
            </Card>
          </li>
        ))}
      </ul>
    </PageLayout>
  );
}
