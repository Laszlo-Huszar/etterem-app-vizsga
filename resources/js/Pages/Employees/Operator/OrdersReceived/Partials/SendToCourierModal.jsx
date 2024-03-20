import DangerButton from '@/Components/DangerButton';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import { Listbox } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/24/outline';
import { Fragment, useState } from 'react';

export default function SendToCourierModal({ show, setShow, couriers, onOk }) {
  const [selectedCourier, setSelectedCourier] = useState(couriers[0]);

  return (
    <Modal show={show} onClose={setShow}>
      <div className="flex flex-col justify-between p-8 h-96">
        <div>
          <InputLabel htmlFor="courier" value="Futár" />

          <Listbox
            className="mt-1 mb-6 relative"
            as="div"
            value={selectedCourier}
            onChange={setSelectedCourier}
          >
            <Listbox.Button className="flex justify-between items-center border-2 border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm p-4 w-full outline-none">
              <span>{selectedCourier.name}</span>
              <ChevronUpDownIcon className="w-6 h-6" />
            </Listbox.Button>
            <Listbox.Options className="mt-1 absolute h-44 py-4 overflow-y-auto border-2 border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm outline-none w-full">
              {couriers.map(courier => (
                <Listbox.Option key={courier.id} value={courier} as={Fragment}>
                  {({ active, selected }) => (
                    <li
                      className={`px-4 py-2 ${
                        active ? 'bg-indigo-400 dark:bg-indigo-600' : ''
                      }`}
                    >
                      {courier.name}
                    </li>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>
        </div>

        <div className="mt-6 flex justify-end">
          <SecondaryButton onClick={() => setShow(false)}>
            Mégsem
          </SecondaryButton>

          <DangerButton
            className="ms-3"
            onClick={() => onOk(selectedCourier.employee.id)}
          >
            Küld
          </DangerButton>
        </div>
      </div>
    </Modal>
  );
}
