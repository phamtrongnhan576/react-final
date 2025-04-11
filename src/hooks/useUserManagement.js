import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  setPagination,
  addUser,
  deleteUser,
  updateUser,
  searchUsers,
} from "../store/admin/adminUserSlice";
import { Form, message } from "antd";

export const useUserManagement = () => {
  const dispatch = useDispatch();
  const { users, loading, error, pagination } = useSelector(
    (state) => state.adminUser
  );

  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

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
        message.success(`Đã xóa người dùng: ${currentUser?.hoTen}`);
        setIsSearching(false);
        dispatch(
          fetchUsers({
            currentPage: pagination.currentPage,
            itemsPerPage: pagination.itemsPerPage,
          })
        );
        setIsDeleteModalVisible(false);
      })
      .catch((error) => message.error(`Lỗi khi xóa người dùng: ${error}`));
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
          message.success(successMessage);
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
          message.error(`Lỗi: ${error.message || "Không thể xử lý"}`)
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
        keyword,
        currentPage: 1,
        itemsPerPage: pagination.itemsPerPage,
      })
    )
      .unwrap()
      .then(() => {
        message.success(`Tìm kiếm với từ khóa: ${keyword}`);
      })
      .catch(() => {
        message.error(
          `Lỗi khi tìm kiếm: ${error.message || "Không thể xử lý"}`
        );
      });
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
