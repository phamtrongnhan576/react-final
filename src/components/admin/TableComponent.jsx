import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFilms, setPagination } from "../../store/admin/adminSlice.js";
import {
  Table,
  Pagination,
  Modal,
  message,
  Image,
  Form,
  Input,
  Button,
  Upload,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";

const AdminDashBoardPage = () => {
  const dispatch = useDispatch();
  const { films, loading, error, pagination } = useSelector(
    (state) => state.admin
  );
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentFilm, setCurrentFilm] = useState(null);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    dispatch(
      fetchFilms({
        page: pagination.currentPage,
        itemsPerPage: pagination.itemsPerPage,
      })
    );
  }, [dispatch, pagination.currentPage, pagination.itemsPerPage]);

  const handlePageChange = (page, pageSize) => {
    dispatch(
      setPagination({
        currentPage: page,
        itemsPerPage: pageSize,
      })
    );
  };

  const handleEdit = (film) => {
    setCurrentFilm(film);
    form.setFieldsValue({
      tenPhim: film.tenPhim,
      moTa: film.moTa,
    });
    setIsModalVisible(true);
  };

  const handleDelete = (filmId) => {
    setCurrentFilm(films.find((film) => film.maPhim === filmId));
    setIsDeleteModalVisible(true);
  };

  const handleDeleteConfirm = () => {
    message.success(`Đã xóa phim: ${currentFilm?.tenPhim}`);
    setIsDeleteModalVisible(false);
    // Gọi API xóa ở đây
  };

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        message.success(`Đã cập nhật phim: ${values.tenPhim}`);
        setIsModalVisible(false);
        // Gọi API cập nhật ở đây
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

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
        <div className="flex gap-2">
          <Button
            onClick={() => handleEdit(record)}
            icon={<EditOutlined />}
            type="primary"
            ghost
          />
          <Button
            onClick={() => handleDelete(record.maPhim)}
            icon={<DeleteOutlined />}
            type="primary"
            danger
            ghost
          />
        </div>
      ),
    },
  ];

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>Lỗi: {error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Film Management</h1>

      <Table
        dataSource={films}
        columns={columns}
        pagination={false}
        rowKey="maPhim"
        scroll={{ x: 800 }}
      />

      <div className="mt-4 flex justify-end">
        <Pagination
          current={pagination.currentPage}
          pageSize={pagination.itemsPerPage}
          total={pagination.totalItems}
          onChange={handlePageChange}
          onShowSizeChange={handlePageChange}
          showSizeChanger
          pageSizeOptions={[10, 20, 50, 100]}
          showTotal={(total) => `Tổng ${total} phim`}
        />
      </div>

      {/* Modal chỉnh sửa */}
      <Modal
        title="Chỉnh sửa phim"
        visible={isModalVisible}
        onOk={handleSubmit}
        onCancel={() => setIsModalVisible(false)}
        okText="Lưu"
        cancelText="Hủy"
        width={700}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="tenPhim"
            label="Tên phim"
            rules={[{ required: true, message: "Vui lòng nhập tên phim" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="moTa"
            label="Mô tả"
            rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item label="Hình ảnh">
            <Upload
              fileList={fileList}
              onChange={({ fileList }) => setFileList(fileList)}
              beforeUpload={() => false}
              listType="picture"
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Tải lên</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal xác nhận xóa */}
      <Modal
        title="Xác nhận xóa"
        visible={isDeleteModalVisible}
        onOk={handleDeleteConfirm}
        onCancel={() => setIsDeleteModalVisible(false)}
        okText="Xóa"
        cancelText="Hủy"
        okButtonProps={{ danger: true }}
      >
        <p>
          Bạn có chắc chắn muốn xóa phim <b>{currentFilm?.tenPhim}</b>?
        </p>
      </Modal>
    </div>
  );
};

export default AdminDashBoardPage;
