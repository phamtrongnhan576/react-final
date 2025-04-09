import { Table, Pagination, Image } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const FilmTable = ({
  films,
  pagination,
  loading,
  onPageChange,
  onEdit,
  onDelete,
}) => {
  const columns = [
    {
      title: "Mã Phim",
      dataIndex: "maPhim",
      key: "maPhim",
      sorter: (a, b) => a.maPhim - b.maPhim,
    },
    {
      title: "Tên Phim",
      dataIndex: "tenPhim",
      key: "tenPhim",
      sorter: (a, b) => a.tenPhim.localeCompare(b.tenPhim),
    },
    {
      title: "Hình Ảnh",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      render: (text) => (
        <Image
          src={text}
          alt="Poster phim"
          width={50}
          height={70}
          style={{ objectFit: "cover" }}
          preview
        />
      ),
    },
    {
      title: "Mô Tả",
      dataIndex: "moTa",
      key: "moTa",
      render: (text) => (
        <div
          style={{
            maxWidth: 200,
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
            onClick={() => onDelete(record.maPhim)}
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
        dataSource={films}
        columns={columns}
        pagination={false}
        rowKey="maPhim"
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
          showTotal={(total) => `Tổng ${total} phim`}
        />
      </div>
    </>
  );
};

export default FilmTable;
