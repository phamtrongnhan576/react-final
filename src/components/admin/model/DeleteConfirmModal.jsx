import { Modal } from "antd";

const DeleteConfirmModal = ({ visible, onConfirm, onCancel, currentFilm }) => (
  <Modal
    title={null}
    open={visible}
    onOk={onConfirm}
    onCancel={onCancel}
    okText="Xóa"
    cancelText="Hủy"
    okButtonProps={{
      className: "bg-red-600 hover:bg-red-700 border-red-600 text-white",
    }}
    cancelButtonProps={{
      className: "border-gray-300 hover:bg-gray-50",
    }}
    footer={null}
    closable={false}
    width={500}
    styles={{ body: { padding: "24px" } }}
  >
    <div className="text-center">
      <h2 className="text-xl font-semibold mb-4">Xác nhận xóa</h2>

      <div className="mb-6">
        <p className="text-gray-700 mb-2">
          Bạn có chắc chắn muốn xóa phim{" "}
          <span className="font-bold">"{currentFilm?.tenPhim}"</span>?
        </p>
        <p className="text-gray-500 text-sm">
          Hành động này không thể hoàn tác. Tất cả dữ liệu liên quan sẽ bị xóa
          vĩnh viễn.
        </p>
      </div>

      <div className="border-t border-gray-200 pt-4 flex justify-end space-x-3">
        <button
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
        >
          Hủy
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors cursor-pointer"
        >
          Xóa
        </button>
      </div>
    </div>
  </Modal>
);

export default DeleteConfirmModal;
