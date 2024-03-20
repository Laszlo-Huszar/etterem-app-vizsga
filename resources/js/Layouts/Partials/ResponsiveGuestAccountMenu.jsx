import ResponsiveNavLink from '@/Components/ResponsiveNavLink';

export default function ResponsiveGuestAccountMenu() {
  return (
    <div className="pb-1 border-t border-gray-200 dark:border-gray-600">
      <div className="mt-3 space-y-1">
        <ResponsiveNavLink
          href={route('login')}
          active={route().current('login')}
        >
          Belépés
        </ResponsiveNavLink>
        <ResponsiveNavLink
          href={route('register')}
          active={route().current('register')}
        >
          Regisztráció
        </ResponsiveNavLink>
      </div>
    </div>
  );
}
