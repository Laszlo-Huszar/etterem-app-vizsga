import Card from '@/Components/Card';
import PrimaryButton from '@/Components/PrimaryButton';
import SvgButton from '@/Components/SvgButton';
import PageLayout from '@/Layouts/PageLayout';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Head, router } from '@inertiajs/react';

export default function Index({ users }) {
  const handleCreateEmployee = () => {
    router.get(route('admin.employees.create'));
  };

  const handleEditEmployee = userId => {
    router.get(route('admin.employees.edit', userId));
  };

  const handleDeleteEmployee = userId => {
    router.delete(route('admin.employees.destroy', userId));
  };

  return (
    <PageLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Munkavállalói fiókok
        </h2>
      }
    >
      <Head title="Munkavállalói fiókok" />

      <div className="px-4 sm:px-0">
        <PrimaryButton onClick={handleCreateEmployee}>
          + Új munkavállaló
        </PrimaryButton>
      </div>

      <Card className="mt-8 hidden sm:flex items-center sm:px-8 py-4 text-gray-800 dark:text-gray-200 font-semibold">
        <div className="grow sm:grid grid-cols-3 gap-4">
          <p>Név</p>
          <p>Email</p>
          <p>Beosztás</p>
        </div>
        <div className="w-20"></div>
      </Card>

      {users.length > 0 && (
        <ul className="mt-4 sm:mt-2 space-y-2">
          {users.map(user => (
            <li key={user.id}>
              <Card className="flex justify-between items-center p-4 sm:p-8">
                <div className="grow grid sm:grid-cols-3 gap-4">
                  <div>
                    <p className="block sm:hidden text-gray-800 dark:text-gray-200 font-semibold">
                      Név:
                    </p>
                    <p className="overflow-hidden">{user.name}</p>
                  </div>
                  <div>
                    <p className="block sm:hidden text-gray-800 dark:text-gray-200 font-semibold">
                      Email:
                    </p>
                    <p className="overflow-hidden">{user.email}</p>
                  </div>
                  <div>
                    <p className="block sm:hidden text-gray-800 dark:text-gray-200 font-semibold">
                      Beosztás:
                    </p>
                    <p className="overflow-hidden">{user.employee.position}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <SvgButton>
                    <PencilSquareIcon
                      className="w-6 h-6"
                      onClick={() => handleEditEmployee(user.id)}
                    />
                  </SvgButton>
                  <SvgButton>
                    <TrashIcon
                      className="w-6 h-6"
                      onClick={() => handleDeleteEmployee(user.id)}
                    />
                  </SvgButton>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </PageLayout>
  );
}
