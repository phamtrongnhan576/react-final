import { Table, Pagination } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const UserTable = ({
  users,
  pagination,
  loading,
  onPageChange,
  onEdit,
  onDelete,
}) => {
  const columns = [
    {
      title: "STT",
      key: "stt",
      render: (text, record, index) =>
        index + 1 + (pagination.currentPage - 1) * pagination.itemsPerPage,
    },
    {
      title: "Tài Khoản",
      dataIndex: "taiKhoan",
      key: "taiKhoan",
      sorter: (a, b) => a.taiKhoan.localeCompare(b.taiKhoan),
      render: (text) => (
        <div
          className="lg:w-[200px] w-[100px]"
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {text}
        </div>
      ),
    },
    {
      title: "Họ Tên",
      dataIndex: "hoTen",
      key: "hoTen",
      sorter: (a, b) => a.hoTen.localeCompare(b.hoTen),
      render: (text) => (
        <div
          className="lg:w-[200px] w-[100px]"
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {text}
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
      render: (text) => (
        <div
          className="lg:w-[200px] w-[100px]"
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {text}
        </div>
      ),
    },
    {
      title: "Số Điện Thoại",
      dataIndex: "soDt",
      key: "soDt",
      sorter: (a, b) => a.soDt.localeCompare(b.soDt),
      render: (text) => (
        <div
          className="lg:w-[150px] w-[80px]"
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {text}
        </div>
      ),
    },
    {
      title: "Hành Động",
      key: "action",
      render: (_, record) => (
        <div>
          <button
            onClick={() => onEdit(record)}
            className="text-blue-500 mr-4 cursor-pointer"
          >
            <EditOutlined style={{ fontSize: "20px" }} />
          </button>
          <button
            onClick={() => onDelete(record.taiKhoan)}
            className="text-red-500 cursor-pointer"
          >
            <DeleteOutlined style={{ fontSize: "20px" }} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Table
        dataSource={users}
        columns={columns}
        pagination={false}
        rowKey="email"
        scroll={{ x: 800 }}
        loading={loading}
      />
      <div className="mt-4 flex justify-end">
        <Pagination
          current={pagination.currentPage}
          pageSize={pagination.itemsPerPage}
          total={pagination.totalCount}
          onChange={onPageChange}
          onShowSizeChange={onPageChange}
          showSizeChanger
          pageSizeOptions={[10, 20, 50, 100]}
          showTotal={(total) => `Tổng ${total} tài khoản`}
        />
      </div>
    </>
  );
};

export default UserTable;
