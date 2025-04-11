import { Modal } from "antd";

const DeleteUserModal = ({ visible, onConfirm, onCancel, currentUser }) => (
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
      Bạn có chắc chắn muốn xóa tài khoản <b>{currentUser?.taiKhoan}</b>?
    </p>
  </Modal>
);

export default DeleteUserModal;
