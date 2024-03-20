import ResponsiveNavLink from '@/Components/ResponsiveNavLink';

export default function ResponsiveGuestMainMenu() {
  return (
    <div className="pt-2 pb-3 space-y-1">
      <ResponsiveNavLink href={route('home')} active={route().current('home')}>
        Guest Dashboard
      </ResponsiveNavLink>
    </div>
  );
}
