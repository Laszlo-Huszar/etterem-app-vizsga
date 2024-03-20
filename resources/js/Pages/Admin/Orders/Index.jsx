import Card from '@/Components/Card';
import PageLayout from '@/Layouts/PageLayout';
import { Head } from '@inertiajs/react';

export default function Index({ orders }) {
  console.log(orders);
  return (
    <PageLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Rendelések
        </h2>
      }
    >
      <Head title="Rendelések" />

      {orders.length > 0 && (
        <ul className="space-y-6">
          {orders.map(order => (
            <li key={order.id}>
              {order.order_statuses.length > 0 && (
                <Card className="p-4 sm:p-8">
                  <p className="text-lg">Rsz.: {order.order_number}</p>
                  <div className="mt-8 hidden grow sm:grid grid-cols-3 gap-4 text-gray-800 dark:text-gray-200 font-semibold">
                    <p>Idő</p>
                    <p>Elküldte</p>
                    <p>Állapot</p>
                  </div>

                  <ul className="mt-8 sm:mt-0 divide-y divide-gray-400 dark:divide-gray-600 space-y-4">
                    {order.order_statuses.map(orderStatus => (
                      <li className="pt-4 " key={orderStatus.id}>
                        <div className="grow grid sm:grid-cols-3 gap-4">
                          <div>
                            <p className="block sm:hidden text-gray-800 dark:text-gray-200 font-semibold">
                              Idő:
                            </p>
                            <p className="overflow-hidden">
                              {new Date(
                                orderStatus.created_at
                              ).toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className="block sm:hidden text-gray-800 dark:text-gray-200 font-semibold">
                              Elküldte:
                            </p>
                            <p className="overflow-hidden">
                              {orderStatus.current_employee
                                ? orderStatus.current_employee.user.name
                                : '-'}
                            </p>
                          </div>
                          <div>
                            <p className="block sm:hidden text-gray-800 dark:text-gray-200 font-semibold">
                              Állapot:
                            </p>
                            <p className="overflow-hidden">
                              {orderStatus.status}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </Card>
              )}
            </li>
          ))}
        </ul>
      )}
    </PageLayout>
  );
}
