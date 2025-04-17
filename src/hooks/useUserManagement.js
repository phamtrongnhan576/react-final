import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, notification } from "antd";
import {
  fetchUsers,
  setPagination,
  addUser,
  deleteUser,
  updateUser,
  searchUsers,
} from "../store/admin/adminUserSlice";

export const useUserManagement = () => {
  const [api, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const dispatch = useDispatch();
  const { users, loading, error, pagination } = useSelector(
    (state) => state.adminUser
  );

  useEffect(() => {
    if (!isSearching) {
      dispatch(
        fetchUsers({
          currentPage: pagination.currentPage,
          itemsPerPage: pagination.itemsPerPage,
        })
      );
    }
  }, [dispatch, pagination.currentPage, pagination.itemsPerPage, isSearching]);

  const handlePageChange = (currentPage, itemsPerPage) => {
    dispatch(setPagination({ currentPage, itemsPerPage }));
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleDelete = (taiKhoan) => {
    setCurrentUser(users.find((user) => user.taiKhoan === taiKhoan));
    setIsDeleteModalVisible(true);
  };

  const handleDeleteConfirm = () => {
    dispatch(deleteUser(currentUser.taiKhoan))
      .unwrap()
      .then(() => {
        api.success({
          message: "Thành công",
          description: `Đã xóa phim: ${currentUser?.hoTen}`,
        });
        setIsSearching(false);
        dispatch(
          fetchUsers({
            currentPage: pagination.currentPage,
            itemsPerPage: pagination.itemsPerPage,
          })
        );
        setIsDeleteModalVisible(false);
      })
      .catch((error) =>
        api.error({
          message: "Lỗi",
          description: `Lỗi: ${error.message || error}`,
        })
      );
  };

  const handleCreate = () => {
    setCurrentUser(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    form.setFieldsValue({
      taiKhoan: user.taiKhoan,
      matKhau: user.matKhau,
      hoTen: user.hoTen,
      email: user.email,
      soDt: user.soDt,
      maLoaiNguoiDung: user.maLoaiNguoiDung,
    });
    setIsModalVisible(true);
  };

  const handleModalSubmit = () => {
    form.validateFields().then((values) => {
      const formData = new FormData();

      formData.append("taiKhoan", values.taiKhoan);
      formData.append("matKhau", values.matKhau);
      formData.append("hoTen", values.hoTen);
      formData.append("email", values.email);
      formData.append("soDt", values.soDt);
      formData.append("maLoaiNguoiDung", values.maLoaiNguoiDung);
      formData.append("maNhom", "GP01");

      const action = currentUser ? updateUser(formData) : addUser(formData);
      const successMessage = currentUser
        ? `Đã cập nhật người dùng: ${values.hoTen}`
        : `Đã thêm người dùng: ${values.hoTen}`;

      dispatch(action)
        .unwrap()
        .then(() => {
          api.success({
            message: "Thành công",
            description: successMessage,
          });
          handleModalCancel();
          setIsSearching(false);
          dispatch(
            fetchUsers({
              currentPage: pagination.currentPage,
              itemsPerPage: pagination.itemsPerPage,
            })
          );
        })
        .catch((error) =>
          api.error({
            message: "Lỗi",
            description: `Lỗi: ${error.message || error}`,
          })
        );
    });
  };

  const handleSearch = ({ keyword }) => {
    if (!keyword || keyword.trim() === "") {
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    dispatch(
      searchUsers({
        keyword: keyword.trim(),
        currentPage: 1,
        itemsPerPage: pagination.itemsPerPage,
      })
    );
  };

  return {
    users,
    loading,
    error,
    pagination,
    form,
    isModalVisible,
    isDeleteModalVisible,
    currentUser,
    contextHolder,
    setIsDeleteModalVisible,
    handlePageChange,
    handleEdit,
    handleDelete,
    handleDeleteConfirm,
    handleCreate,
    handleModalCancel,
    handleModalSubmit,
    handleSearch,
  };
};
