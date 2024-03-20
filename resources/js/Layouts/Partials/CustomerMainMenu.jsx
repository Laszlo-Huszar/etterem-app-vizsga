import NavLink from '@/Components/NavLink';
import { usePage } from '@inertiajs/react';

export default function CustomerMainMenu() {
  const cartItemCount = usePage().props.cartItemCount;
  return (
    <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
      <NavLink
        href={route('food-menu.index')}
        active={route().current('food-menu.index')}
      >
        Étlap
      </NavLink>
      <NavLink
        href={route('customer.cart.index')}
        active={route().current('customer.cart.index')}
      >
        <span>Kosár</span>
        {cartItemCount > 0 && (
          <span className="ms-1 flex justify-center items-center bg-gray-800 dark:bg-gray-200 text-sm font-bold text-white dark:text-gray-800 rounded-full w-5 h-5">
            {cartItemCount}
          </span>
        )}
      </NavLink>
    </div>
  );
}
