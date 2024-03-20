import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link, usePage } from '@inertiajs/react';
import GuestAccountMenu from './Partials/GuestAccountMenu';
import AuthAccountMenu from './Partials/AuthAccountMenu';
import GuestMainMenu from './Partials/GuestMainMenu';
import ResponsiveNavigationButton from './Partials/ResponsiveNavigationButton';
import ResponsiveGuestMainMenu from './Partials/ResponsiveGuestMainMenu';
import ResponsiveAuthAccountMenu from './Partials/ResponsiveAuthAccountMenu';
import ResponsiveGuestAccountMenu from './Partials/ResponsiveGuestAccountMenu';
import AdminMainMenu from './Partials/AdminMainMenu';
import ResponsiveAdminMainMenu from './Partials/ResponsiveAdminMainMenu';
import CustomerMainMenu from './Partials/CustomerMainMenu';
import ResponsiveCustomerMainMenu from './Partials/ResponsiveCustomerMainMenu';
import EmployeeMainMenu from './Partials/EmployeeMainMenu';
import ResponsiveEmployeeMainMenu from './Partials/ResponsiveEmployeeMainMenu';
import CustomerAccountMenu from './Partials/CustomerAccountMenu';
import ResponsiveCustomerAccountMenu from './Partials/ResponsiveCustomerAccountMenu';

export default function PageLayout({ header, children }) {
  const user = usePage().props.auth.user;

  const [showingNavigationDropdown, setShowingNavigationDropdown] =
    useState(false);

  return (
    <div className="min-h-screen text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900">
      <nav
        className={`bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700${
          user && user.role !== 'admin' ? ' sticky top-0' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="shrink-0 flex items-center">
                <Link href="/">
                  <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200" />
                </Link>
              </div>
              {!user && <GuestMainMenu />}
              {user && user.role === 'admin' && <AdminMainMenu />}
              {user && user.role === 'employee' && <EmployeeMainMenu />}
              {user && user.role === 'customer' && <CustomerMainMenu />}
            </div>

            {!user && <GuestAccountMenu />}
            {user && user.role === 'customer' && <CustomerAccountMenu />}
            {user && user.role !== 'customer' && <AuthAccountMenu />}

            <ResponsiveNavigationButton
              showingNavigationDropdown={showingNavigationDropdown}
              setShowingNavigationDropdown={setShowingNavigationDropdown}
            />
          </div>
        </div>

        <div
          className={
            (showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'
          }
        >
          {!user && <ResponsiveGuestMainMenu />}
          {user && user.role === 'admin' && <ResponsiveAdminMainMenu />}
          {user && user.role === 'employee' && <ResponsiveEmployeeMainMenu />}
          {user && user.role === 'customer' && <ResponsiveCustomerMainMenu />}

          {!user && <ResponsiveGuestAccountMenu />}
          {user && user.role === 'customer' && (
            <ResponsiveCustomerAccountMenu />
          )}
          {user && user.role !== 'customer' && <ResponsiveAuthAccountMenu />}
        </div>
      </nav>

      {header && (
        <header className="bg-white dark:bg-gray-800 shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            {header}
          </div>
        </header>
      )}

      <main className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
