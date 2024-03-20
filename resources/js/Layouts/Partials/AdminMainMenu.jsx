import NavLink from '@/Components/NavLink';

export default function AdminMainMenu() {
  return (
    <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
      <NavLink
        href={route('food-menu.index')}
        active={route().current('food-menu.index')}
      >
        Étlap
      </NavLink>
      <NavLink
        href={route('admin.edit-food-menu.index')}
        active={route().current('admin.edit-food-menu.index')}
      >
        Étlap Szerkesztése
      </NavLink>
      <NavLink
        href={route('admin.employees.index')}
        active={route().current('admin.employees.index')}
      >
        Munkavállalói fiókok
      </NavLink>
      <NavLink
        href={route('admin.orders.index')}
        active={route().current('admin.orders.index')}
      >
        Rendelések
      </NavLink>
    </div>
  );
}
