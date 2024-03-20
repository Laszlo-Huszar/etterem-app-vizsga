import NavLink from '@/Components/NavLink';

export default function GuestMainMenu() {
  return (
    <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
      <NavLink
        href={route('food-menu.index')}
        active={route().current('food-menu.index')}
      >
        Étlap
      </NavLink>
    </div>
  );
}
