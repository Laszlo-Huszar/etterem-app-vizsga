import Card from '@/Components/Card';
import Checkbox from '@/Components/Checkbox';
import PrimaryButton from '@/Components/PrimaryButton';
import PageLayout from '@/Layouts/PageLayout';
import { Head, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import SendToCourierModal from './Partials/SendToCourierModal';

export default function Index({ orders, couriers }) {
  const [checkedAll, setCheckedAll] = useState(false);

  const [checkedOrders, setCheckedOrders] = useState(() => {
    let arr = [];
    for (const order of orders) {
      arr.push({ orderId: order.id, checked: false });
    }
    return arr;
  });

  const [showCourierModal, setShowCourierModal] = useState(false);

  const getCheckedByOrderId = orderId => {
    const foundOrder = checkedOrders.find(item => item.orderId === orderId);
    if (foundOrder) {
      return foundOrder.checked;
    }

    return null;
  };

  const isAnyChecked = () => {
    return !checkedOrders.find(item => item.checked);
  };

  const handleCheckedOrder = (e, orderId) => {
    setCheckedOrders(prev => {
      const arr = [...prev];

      const foundIndex = arr.findIndex(item => item.orderId === orderId);
      arr[foundIndex].checked = e.target.checked;

      for (const item of arr) {
        if (!item.checked) {
          setCheckedAll(false);
          return arr;
        }
      }

      setCheckedAll(true);
      return arr;
    });
  };

  const handleCheckedAllOrders = e => {
    setCheckedAll(e.target.checked);

    setCheckedOrders(prev => {
      const arr = [...prev];
      for (let item of arr) {
        item.checked = e.target.checked;
      }

      return arr;
    });
  };

  const handleShowSendToCourierModal = () => {
    setShowCourierModal(true);
  };

  const handleSendToCourier = employeeId => {
    let orderIds = [];

    for (const item of checkedOrders) {
      if (item.checked) {
        orderIds.push(item.orderId);
      }
    }

    router.post(route('employees.operator.orders-received.store'), {
      orderIds,
      targetEmployeeId: employeeId,
    });

    setCheckedAll(false);

    setCheckedOrders(prev => {
      const arr = [...prev];
      for (let item of arr) {
        item.checked = false;
      }

      return arr;
    });

    setShowCourierModal(false);
  };

  useEffect(() => {
    window.Echo.listen('employee', 'OnOrderSent', e => {
      router.reload();
    });
  }, []);

  useEffect(() => {
    if (orders.length > 0) {
      setCheckedOrders(prev => {
        let arr = [];
        for (let i = 0; i < orders.length; i++) {
          const foundChecked = prev.find(item => item.orderId === orders[i].id);
          if (foundChecked) {
            arr.push(foundChecked);
          } else {
            arr.push({ orderId: orders[i].id, checked: false });
          }
        }
        for (const item of arr) {
          if (!item.checked) {
            setCheckedAll(false);
            return arr;
          }
        }

        setCheckedAll(true);
        return arr;
      });
    }
  }, [orders]);

  return (
    <PageLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Beérkezett rendelések
        </h2>
      }
    >
      <Head title="Beérkezett rendelések" />

      <SendToCourierModal
        show={showCourierModal}
        setShow={setShowCourierModal}
        couriers={couriers}
        onOk={handleSendToCourier}
      />

      <div className="px-4 sm:px-0">
        <PrimaryButton
          onClick={handleShowSendToCourierModal}
          disabled={isAnyChecked()}
        >
          Küldés kiszállításra
        </PrimaryButton>
      </div>

      <div className="block sm:hidden mt-6 px-4 sm:px-8">
        <label className="flex items-center gap-4" htmlFor="check-box_all">
          <Checkbox
            id="check-box_all"
            checked={checkedAll}
            onChange={handleCheckedAllOrders}
          />
          <span>Összes</span>
        </label>
      </div>

      <Card className="mt-8 hidden sm:flex sm:items-center sm:gap-4 sm:px-8 py-4 text-gray-800 dark:text-gray-200 font-semibold">
        <label className="flex items-center gap-4" htmlFor="check-box_all">
          <Checkbox
            id="check-box_all"
            checked={checkedAll}
            onChange={handleCheckedAllOrders}
          />
        </label>
        <div className="grow grid grid-cols-3 gap-4">
          <p>Rsz.</p>
          <p>Cím</p>
          <p>Ételek</p>
        </div>
      </Card>

      <ul className="mt-2 space-y-2">
        {orders.map(order => (
          <li key={order.id}>
            <Card className="flex items-center bg-gray-800 sm:rounded-lg">
              <label
                className="grow flex gap-4 items-center p-4 sm:p-8"
                htmlFor={`check-box_${order.id}`}
              >
                <Checkbox
                  id={`check-box_${order.id}`}
                  checked={getCheckedByOrderId(order.id)}
                  onChange={e => handleCheckedOrder(e, order.id)}
                />
                <div className="grow grid sm:grid-cols-3 items-center gap-4">
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
                        {order.order_address.zipcode}.{' '}
                        {order.order_address.city}, {order.order_address.street}
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
                </div>
              </label>
            </Card>
          </li>
        ))}
      </ul>
    </PageLayout>
  );
}
