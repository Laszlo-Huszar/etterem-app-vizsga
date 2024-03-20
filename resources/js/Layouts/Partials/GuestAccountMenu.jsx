import NavLink from '@/Components/NavLink';

export default function GuestAccountMenu() {
  return (
    <div className="flex">
      <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
        <NavLink href={route('login')} active={route().current('login')}>
          Belépés
        </NavLink>
        <NavLink href={route('register')} active={route().current('register')}>
          Regisztráció
        </NavLink>
      </div>
    </div>
  );
}
