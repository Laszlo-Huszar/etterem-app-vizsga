import ResponsiveNavLink from '@/Components/ResponsiveNavLink';

export default function ResponsiveAdminMainMenu() {
  return (
    <div className="pt-2 pb-3 space-y-1">
      <ResponsiveNavLink
        href={route('food-menu.index')}
        active={route().current('food-menu.index')}
      >
        Étlap
      </ResponsiveNavLink>
      <ResponsiveNavLink
        href={route('admin.edit-food-menu.index')}
        active={route().current('admin.edit-food-menu.index')}
      >
        Étlap Szerkesztése
      </ResponsiveNavLink>
      <ResponsiveNavLink
        href={route('admin.employees.index')}
        active={route().current('admin.employees.index')}
      >
        Munkavállalói fiókok
      </ResponsiveNavLink>
      <ResponsiveNavLink
        href={route('admin.orders.index')}
        active={route().current('admin.orders.index')}
      >
        Rendelések
      </ResponsiveNavLink>
    </div>
  );
}
