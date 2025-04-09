import { Modal } from "antd";

const DeleteConfirmModal = ({ visible, onConfirm, onCancel, currentFilm }) => (
  <Modal
    title="Xác nhận xóa"
    open={visible}
    onOk={onConfirm}
    onCancel={onCancel}
    okText="Xóa"
    cancelText="Hủy"
    okButtonProps={{ danger: true }}
  >
    <p>
      Bạn có chắc chắn muốn xóa phim <b>{currentFilm?.tenPhim}</b>?
    </p>
  </Modal>
);

export default DeleteConfirmModal;
