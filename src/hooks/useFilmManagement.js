import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFilms,
  setPagination,
  addFilm,
  deleteFilm,
  updateFilm,
} from "../store/admin/adminFilmSlice";
import { Form, message, Upload } from "antd";
import dayjs from "dayjs";

export const useFilmManagement = () => {
  const dispatch = useDispatch();
  const { films, loading, error, pagination } = useSelector(
    (state) => state.adminFilm
  );
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentFilm, setCurrentFilm] = useState(null);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    dispatch(
      fetchFilms({
        currentPage: pagination.currentPage,
        itemsPerPage: pagination.itemsPerPage,
      })
    );
  }, [dispatch, pagination.currentPage, pagination.itemsPerPage]);

  const handlePageChange = (currentPage, itemsPerPage) => {
    dispatch(setPagination({ currentPage, itemsPerPage }));
  };

  const handleEdit = (film) => {
    setCurrentFilm(film);
    setFileList([
      { uid: "-1", name: "image.png", status: "done", url: film.hinhAnh },
    ]);
    form.setFieldsValue({
      tenPhim: film.tenPhim,
      moTa: film.moTa,
      ngayKhoiChieu: dayjs(film.ngayKhoiChieu),
      danhGia: film.danhGia,
      trailer: film.trailer,
      hot: film.hot,
      sapChieu: film.sapChieu,
    });
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
        dispatch(
          fetchFilms({
            currentPage: pagination.currentPage,
            itemsPerPage: pagination.itemsPerPage,
          })
        );
        setIsDeleteModalVisible(false);
      })
      .catch((error) => message.error(`Lỗi khi xóa phim: ${error}`));
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
    form.validateFields().then((values) => {
      const formData = new FormData();
      if (currentFilm) formData.append("maPhim", currentFilm.maPhim);
      formData.append("tenPhim", values.tenPhim);
      formData.append("moTa", values.moTa);
      formData.append(
        "ngayKhoiChieu",
        values.ngayKhoiChieu.format("DD/MM/YYYY")
      );
      formData.append("danhGia", values.danhGia);
      formData.append("trailer", values.trailer);
      formData.append("hot", values.hot);
      formData.append("sapChieu", values.sapChieu);
      formData.append("maNhom", "GP01");
      formData.append("hinhAnh", fileList[0].originFileObj);

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
              currentPage: pagination.currentPage,
              itemsPerPage: pagination.itemsPerPage,
            })
          );
        })
        .catch((error) => message.error(`Lỗi: ${error.message || error}`));
    });
  };

  const beforeUpload = (file) => {
    const isJpgOrPng =
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/webp";
    if (!isJpgOrPng) {
      message.error("Chỉ cho phép tải lên file JPG/PNG/WEBP!");
      return Upload.LIST_IGNORE;
    }
    const isLt1M = file.size / 1024 / 1024 < 1;
    if (!isLt1M) {
      message.error("Kích thước hình ảnh phải nhỏ hơn 1MB!");
      return Upload.LIST_IGNORE;
    }
    return false;
  };

  return {
    films,
    loading,
    error,
    pagination,
    form,
    isModalVisible,
    isDeleteModalVisible,
    currentFilm,
    fileList,
    setFileList,
    handlePageChange,
    handleEdit,
    handleDelete,
    handleDeleteConfirm,
    handleCreate,
    handleModalCancel,
    handleModalSubmit,
    beforeUpload,
  };
};
