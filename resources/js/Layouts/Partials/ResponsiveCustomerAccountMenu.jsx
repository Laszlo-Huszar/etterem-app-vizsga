import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { usePage } from '@inertiajs/react';

export default function ResponsiveCustomerAccountMenu() {
  const user = usePage().props.auth.user;
  return (
    <div className="pt-4 pb-1 border-t border-gray-200 dark:border-gray-600">
      <div className="px-4">
        <div className="font-medium text-base text-gray-800 dark:text-gray-200">
          {user.name}
        </div>
        <div className="font-medium text-sm text-gray-500">{user.email}</div>
      </div>

      <div className="mt-3 space-y-1">
        <ResponsiveNavLink
          href={route('profile.edit')}
          active={route().current('profile.edit')}
        >
          Felhasználói fiók
        </ResponsiveNavLink>
        <ResponsiveNavLink
          href={route('customer.addresses.index')}
          active={route().current('customer.addresses.index')}
        >
          Szállítási címek
        </ResponsiveNavLink>
        <ResponsiveNavLink
          href={route('customer.my-orders.index')}
          active={route().current('customer.my-orders.index')}
        >
          Rendeléseim
        </ResponsiveNavLink>
        <ResponsiveNavLink method="post" href={route('logout')} as="button">
          Kilépés
        </ResponsiveNavLink>
      </div>
    </div>
  );
}
