import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { usePage } from '@inertiajs/react';

export default function ResponsiveEmployeeMainMenu() {
  const employee = usePage().props.auth.employee;
  return (
    <div className="pt-2 pb-3 space-y-1">
      {employee.position === 'operator' && (
        <>
          <ResponsiveNavLink
            href={route('employees.operator.orders-received.index')}
            active={route().current('employees.operator.orders-received.index')}
          >
            Beérkezett rendelések
          </ResponsiveNavLink>
          <ResponsiveNavLink
            href={route('employees.operator.orders-sent.index')}
            active={route().current('employees.operator.orders-sent.index')}
          >
            Szállítás alatt lévő rendelések
          </ResponsiveNavLink>
        </>
      )}
      {employee.position === 'courier' && (
        <>
          <ResponsiveNavLink
            href={route('employee.courier.index')}
            active={route().current('employee.courier.index')}
          >
            Kiszállítandó rendelések
          </ResponsiveNavLink>
        </>
      )}
    </div>
  );
}
