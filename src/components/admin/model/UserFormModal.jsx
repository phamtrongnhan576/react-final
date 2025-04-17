import { Modal, Form, Input, Select } from "antd";
import {
  UserAddOutlined,
  UserOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  EditOutlined,
  IdcardOutlined,
} from "@ant-design/icons";

const UserFormModal = ({ visible, onCancel, onSubmit, form, currentUser }) => (
  <Modal
    title={
      <div className="flex items-center gap-3 text-xl font-bold text-gray-800">
        {currentUser ? (
          <>
            <EditOutlined className="text-blue-500" />
            <span>Chỉnh sửa người dùng</span>
          </>
        ) : (
          <>
            <UserAddOutlined className="text-green-500" />
            <span>Thêm người dùng mới</span>
          </>
        )}
      </div>
    }
    open={visible}
    onOk={onSubmit}
    onCancel={onCancel}
    okText={currentUser ? "Lưu thay đổi" : "Tạo người dùng"}
    cancelText="Hủy"
    width={720}
    okButtonProps={{
      className:
        "bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold shadow-lg hover:opacity-90",
      size: "large",
      style: { borderRadius: 8, minWidth: 140 },
    }}
    cancelButtonProps={{
      className: "bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium",
      size: "large",
      style: { borderRadius: 8, minWidth: 140 },
    }}
    styles={{
      body: {
        padding: "32px",
        maxHeight: "70vh",
        overflowY: "auto",
      },
      header: {
        padding: "24px 32px 16px",
        borderBottom: "1px solid #f0f0f0",
      },
      footer: {
        padding: "16px 32px 24px",
        borderTop: "1px solid #f0f0f0",
      },
    }}
    className="rounded-xl shadow-xl backdrop-blur"
  >
    <Form
      form={form}
      layout="vertical"
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      <Form.Item
        name="taiKhoan"
        label="Tài khoản"
        rules={[{ required: true, message: "Vui lòng nhập tài khoản" }]}
      >
        <Input
          prefix={<UserOutlined />}
          placeholder="Nhập tài khoản"
          disabled={currentUser}
          className="rounded-lg px-4 py-3 border border-gray-300 focus:border-blue-500 hover:border-blue-400 transition-all duration-200"
        />
      </Form.Item>

      <Form.Item
        name="matKhau"
        label="Mật khẩu"
        rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Nhập mật khẩu"
          className="rounded-lg px-4 py-3 border border-gray-300 focus:border-blue-500 hover:border-blue-400 transition-all duration-200"
        />
      </Form.Item>
      <Form.Item
        name="hoTen"
        label="Họ và tên"
        rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}
      >
        <Input
          prefix={<IdcardOutlined />}
          placeholder="Nhập họ và tên"
          className="rounded-lg px-4 py-3 border border-gray-300 focus:border-blue-500 hover:border-blue-400 transition-all duration-200"
        />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        rules={[
          { required: true, message: "Vui lòng nhập email" },
          { type: "email", message: "Email không hợp lệ" },
        ]}
      >
        <Input
          prefix={<MailOutlined />}
          placeholder="Nhập email"
          className="rounded-lg px-4 py-3 border border-gray-300 focus:border-blue-500 hover:border-blue-400 transition-all duration-200"
        />
      </Form.Item>

      <Form.Item
        name="soDt"
        label="Số điện thoại"
        rules={[
          { required: true, message: "Vui lòng nhập số điện thoại" },
          {
            pattern: /^[0-9]{10,11}$/,
            message: "Số điện thoại phải có 10-11 chữ số",
          },
        ]}
      >
        <Input
          prefix={<PhoneOutlined />}
          placeholder="Nhập số điện thoại"
          className="rounded-lg px-4 py-3 border border-gray-300 focus:border-blue-500 hover:border-blue-400 transition-all duration-200"
        />
      </Form.Item>

      <Form.Item
        name="maLoaiNguoiDung"
        label="Loại người dùng"
        rules={[{ required: true, message: "Vui lòng chọn loại người dùng" }]}
      >
        <Select
          placeholder="Chọn loại người dùng"
          suffixIcon={<UserOutlined />}
          className="rounded-lg h-12 border border-gray-300 focus:border-blue-500 hover:border-blue-400 transition-all duration-200"
          options={[
            { value: "QuanTri", label: "Quản trị" },
            { value: "KhachHang", label: "Khách hàng" },
          ]}
        />
      </Form.Item>
    </Form>
  </Modal>
);

export default UserFormModal;
