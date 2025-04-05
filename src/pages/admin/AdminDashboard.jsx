import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchFilms,
  setPagination,
  addFilm,
  deleteFilm,
  updateFilm,
} from "../../store/admin/adminSlice.js";
import {
  Table,
  Pagination,
  message,
  Image,
  Modal,
  Form,
  Input,
  Button,
  Upload,
  Space,
  DatePicker,
  InputNumber,
  Switch,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  UploadOutlined,
  CalendarOutlined,
  YoutubeOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

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

  // Định nghĩa columns cho bảng
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
            onClick={() => handleEdit(record)}
            className="text-blue-500 mr-4 cursor-pointer"
          >
            <EditOutlined style={{ fontSize: "20px" }} />
          </button>
          <button
            onClick={() => handleDelete(record.maPhim)}
            className="text-red-500 cursor-pointer"
          >
            <DeleteOutlined style={{ fontSize: "20px" }} />
          </button>
        </div>
      ),
    },
  ];

  const handleEdit = (film) => {
    setCurrentFilm(film);
    form.setFieldsValue({
      tenPhim: film.tenPhim,
      moTa: film.moTa,
      ngayKhoiChieu: dayjs(film.ngayKhoiChieu),
      danhGia: film.danhGia,
      trailer: film.trailer,
      hot: film.hot,
      sapChieu: film.sapChieu,
    });
    if (film.hinhAnh) {
      setFileList([
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: film.hinhAnh,
        },
      ]);
    }
    setIsModalVisible(true);
  };

  const handleDelete = (filmId) => {
    setCurrentFilm(films.find((film) => film.maPhim === filmId));
    setIsDeleteModalVisible(true);
  };

  const handleDeleteConfirm = () => {
    dispatch(deleteFilm(currentFilm.maPhim))
      .unwrap()
      .then(() => {
        message.success(`Đã xóa phim: ${currentFilm?.tenPhim}`);
        setIsDeleteModalVisible(false);
      })
      .catch((error) => {
        message.error(`Lỗi khi xóa phim: ${error}`);
      });
  };

  const handleCreate = () => {
    setCurrentFilm(null);
    form.resetFields();
    setFileList([]);
    setIsModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setFileList([]);
    form.resetFields();
  };

  const handleModalSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        const formData = new FormData();

        if (currentFilm) {
          // Cập nhật phim
          formData.append("maPhim", currentFilm.maPhim);
        }

        formData.append("tenPhim", values.tenPhim);
        formData.append("moTa", values.moTa);
        formData.append(
          "ngayKhoiChieu",
          values.ngayKhoiChieu.format("DD/MM/YYYY")
        );
        formData.append("danhGia", values.danhGia);
        formData.append("trailer", values.trailer || "");
        formData.append("hot", values.hot ? "true" : "false");
        formData.append("sapChieu", values.sapChieu ? "true" : "false");
        formData.append("maNhom", "GP01");

        if (fileList.length > 0) {
          formData.append("hinhAnh", fileList[0].originFileObj || fileList[0]);
        }

        const action = currentFilm ? updateFilm(formData) : addFilm(formData);
        const successMessage = currentFilm
          ? `Đã cập nhật phim: ${values.tenPhim}`
          : `Đã thêm phim: ${values.tenPhim}`;

        dispatch(action)
          .unwrap()
          .then(() => {
            message.success(successMessage);
            handleModalCancel();
            dispatch(
              fetchFilms({
                page: pagination.currentPage,
                itemsPerPage: pagination.itemsPerPage,
              })
            );
          })
          .catch((error) => {
            message.error(`Lỗi: ${error.message || error}`);
          });
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  // Thêm hàm kiểm tra định dạng file
  const beforeUpload = (file) => {
    const isJpgOrPng =
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/webp";
    if (!isJpgOrPng) {
      message.error("Chỉ cho phép tải lên file JPG/PNG/WEBP!");
    }
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error("Kích thước hình ảnh phải nhỏ hơn 5MB!");
    }
    return false;
  };

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>Lỗi: {error}</div>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Film Management</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
          Thêm phim mới
        </Button>
      </div>

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

      {/* Modal chung cho thêm mới và chỉnh sửa */}
      <Modal
        title={currentFilm ? "Chỉnh sửa phim" : "Thêm phim mới"}
        open={isModalVisible}
        onOk={handleModalSubmit}
        onCancel={handleModalCancel}
        okText={currentFilm ? "Lưu thay đổi" : "Tạo phim"}
        cancelText="Hủy bỏ"
        width={900}
        okButtonProps={{
          className: "bg-blue-600 hover:bg-blue-700",
          size: "large",
        }}
        cancelButtonProps={{
          size: "large",
        }}
        bodyStyle={{
          padding: "24px",
          maxHeight: "70vh",
          overflowY: "auto",
        }}
      >
        <Form form={form} layout="vertical" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Cột trái - Thông tin phim */}
            <div className="space-y-4">
              <Form.Item
                name="tenPhim"
                label={
                  <span className="font-medium text-gray-700">Tên phim</span>
                }
                rules={[{ required: true, message: "Vui lòng nhập tên phim" }]}
              >
                <Input
                  placeholder="Nhập tên phim"
                  className="p-3 rounded-lg border-gray-300 hover:border-blue-500 focus:border-blue-500"
                />
              </Form.Item>

              <Form.Item
                name="moTa"
                label={<span className="font-medium text-gray-700">Mô tả</span>}
                rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
              >
                <Input.TextArea
                  rows={5}
                  placeholder="Nhập mô tả chi tiết về phim..."
                  className="rounded-lg border-gray-300 hover:border-blue-500"
                />
              </Form.Item>

              <div className="grid grid-cols-2 gap-4">
                <Form.Item
                  name="ngayKhoiChieu"
                  label={
                    <span className="font-medium text-gray-700">
                      Ngày chiếu
                    </span>
                  }
                  rules={[{ required: true, message: "Vui lòng chọn ngày" }]}
                >
                  <DatePicker
                    format="DD/MM/YYYY"
                    placeholder="Chọn ngày"
                    className="w-full p-2 rounded-lg border-gray-300"
                    suffixIcon={<CalendarOutlined className="text-gray-400" />}
                  />
                </Form.Item>

                <Form.Item
                  name="danhGia"
                  label={
                    <span className="font-medium text-gray-700">Đánh giá</span>
                  }
                  rules={[
                    { required: true, message: "Vui lòng nhập đánh giá" },
                  ]}
                >
                  <InputNumber
                    min={1}
                    max={10}
                    placeholder="1-10"
                    className="w-full p-2 rounded-lg border-gray-300"
                  />
                </Form.Item>
              </div>

              <Form.Item
                name="trailer"
                label={
                  <span className="font-medium text-gray-700">
                    Link Trailer
                  </span>
                }
              >
                <Input
                  placeholder="https://youtube.com/embed/..."
                  className="p-2 rounded-lg border-gray-300"
                  prefix={<YoutubeOutlined className="text-gray-400" />}
                />
              </Form.Item>

              <div className="flex space-x-6">
                <Form.Item
                  name="hot"
                  label={
                    <span className="font-medium text-gray-700">Nổi bật</span>
                  }
                  valuePropName="checked"
                  className="mb-0"
                >
                  <Switch
                    checkedChildren={<CheckOutlined />}
                    unCheckedChildren={<CloseOutlined />}
                    className="bg-gray-300"
                  />
                </Form.Item>

                <Form.Item
                  name="sapChieu"
                  label={
                    <span className="font-medium text-gray-700">Sắp chiếu</span>
                  }
                  valuePropName="checked"
                  className="mb-0"
                >
                  <Switch
                    checkedChildren={<CheckOutlined />}
                    unCheckedChildren={<CloseOutlined />}
                    className="bg-gray-300"
                  />
                </Form.Item>
              </div>
            </div>

            {/* Cột phải - Hình ảnh */}
            <Form.Item
              label={
                <span className="font-medium text-gray-700">Hình ảnh phim</span>
              }
              name="hinhAnh"
              rules={[
                {
                  required: !currentFilm,
                  message: (
                    <span className="text-red-500">
                      Vui lòng tải lên hình ảnh
                    </span>
                  ),
                },
              ]}
            >
              <div className="space-y-3">
                <Upload
                  fileList={fileList}
                  onChange={({ fileList }) => setFileList(fileList)}
                  beforeUpload={beforeUpload}
                  showUploadList={false}
                  accept=".jpg,.jpeg,.png,.webp"
                >
                  <Button
                    icon={<UploadOutlined />}
                    type="primary"
                    className="bg-blue-500 hover:bg-blue-600"
                  >
                    Tải lên hình ảnh
                  </Button>
                </Upload>

                <p className="text-xs text-gray-400">
                  Chấp nhận file JPG, PNG (tối đa 5MB)
                </p>

                {/* Khung xem trước */}
                {fileList.length > 0 ? (
                  <div className="mt-4 border border-dashed border-gray-300 rounded-lg p-4">
                    <div className="flex justify-center">
                      <Image
                        src={
                          fileList[0].url ||
                          (fileList[0].originFileObj
                            ? URL.createObjectURL(fileList[0].originFileObj)
                            : "")
                        }
                        alt="Preview"
                        className="rounded-lg object-contain"
                        style={{
                          maxWidth: "100%",
                          maxHeight: "300px",
                          aspectRatio: "3/4",
                        }}
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500 text-center">
                      {fileList[0].name} ({Math.round(fileList[0].size / 1024)}
                      KB)
                    </p>
                  </div>
                ) : currentFilm?.hinhAnh ? (
                  <div className="mt-4 border border-dashed border-gray-300 rounded-lg p-4">
                    <h4 className="font-medium text-gray-700 mb-3">
                      Ảnh hiện tại:
                    </h4>
                    <div className="flex justify-center">
                      <Image
                        src={currentFilm.hinhAnh}
                        alt="Current"
                        className="rounded-lg object-contain"
                        style={{
                          maxWidth: "100%",
                          maxHeight: "300px",
                          aspectRatio: "3/4",
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 border border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50">
                    <p className="text-gray-400">Chưa có hình ảnh được chọn</p>
                  </div>
                )}
              </div>
            </Form.Item>
          </div>
        </Form>
      </Modal>

      {/* Modal xác nhận xóa */}
      <Modal
        title="Xác nhận xóa"
        open={isDeleteModalVisible}
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
