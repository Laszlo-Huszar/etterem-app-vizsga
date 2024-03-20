import DangerButton from '@/Components/DangerButton';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';

export default function DeleteCategoryModal({
  show,
  setShow,
  categoryId,
  categoryName,
  onOk,
}) {
  return (
    <Modal show={show} onClose={setShow}>
      <div className="p-6">
        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
          Biztos, hogy törlöd a "{categoryName}" kategóriát és az összes hozzá
          tartozó ételt?
        </h2>

        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400"></p>

        <div className="mt-6 flex justify-end">
          <SecondaryButton onClick={() => setShow(false)}>
            Mégsem
          </SecondaryButton>

          <DangerButton className="ms-3" onClick={() => onOk(categoryId)}>
            Töröl
          </DangerButton>
        </div>
      </div>
    </Modal>
  );
}
