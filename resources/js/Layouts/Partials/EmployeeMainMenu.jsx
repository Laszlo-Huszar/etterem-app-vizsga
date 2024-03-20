import NavLink from '@/Components/NavLink';
import { usePage } from '@inertiajs/react';

export default function EmployeeMainMenu() {
  const employee = usePage().props.auth.employee;
  return (
    <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
      {employee.position === 'operator' && (
        <>
          <NavLink
            href={route('employees.operator.orders-received.index')}
            active={route().current('employees.operator.orders-received.index')}
          >
            Beérkezett rendelések
          </NavLink>
          <NavLink
            href={route('employees.operator.orders-sent.index')}
            active={route().current('employees.operator.orders-sent.index')}
          >
            Szállítás alatt lévő rendelések
          </NavLink>
        </>
      )}

      {employee.position === 'courier' && (
        <>
          <NavLink
            href={route('employee.courier.index')}
            active={route().current('employee.courier.index')}
          >
            Kiszállítandó rendelések
          </NavLink>
        </>
      )}
    </div>
  );
}
