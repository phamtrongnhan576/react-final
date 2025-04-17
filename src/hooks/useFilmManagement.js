import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, notification, Upload } from "antd";
import dayjs from "dayjs";
import {
  fetchCinemaClusters,
  fetchCinemaSystems,
  fetchFilms,
  setPagination,
  addFilm,
  deleteFilm,
  updateFilm,
  createShowSchedule,
} from "../store/admin/adminFilmSlice";

export const useFilmManagement = () => {
  const [api, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();
  const [currentFilm, setCurrentFilm] = useState(null);
  const [currentSchedule, setCurrentSchedule] = useState(null);
  const [cinemaSystemId, setCinemaSystemId] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isScheduleModalVisible, setIsScheduleModalVisible] = useState(false);
  const [isFetchCinemaSystems, setIsFetchCinemaSystems] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const dispatch = useDispatch();
  const {
    schedule,
    cinemaClusters,
    cinemaSystems,
    films,
    pagination,
    loading,
    error,
  } = useSelector((state) => state.adminFilm);

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

  useEffect(() => {
    if (isFetchCinemaSystems) dispatch(fetchCinemaSystems());
    if (cinemaSystemId) dispatch(fetchCinemaClusters(cinemaSystemId));
  }, [dispatch, cinemaSystemId, isFetchCinemaSystems, schedule]);

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
        api.success({
          message: "Thành công",
          description: `Đã xóa phim: ${currentFilm?.tenPhim}`,
        });
        dispatch(
          fetchFilms({
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
    setCurrentFilm(null);
    form.resetFields();
    setFileList([]);
    setIsModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setIsScheduleModalVisible(false);
    setIsFetchCinemaSystems(false);
    setFileList([]);
    setCinemaSystemId(null);
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
          api.success({
            message: "Thành công",
            description: successMessage,
          });
          handleModalCancel();
          dispatch(
            fetchFilms({
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

  const beforeUpload = (file) => {
    const isJpgOrPng =
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/webp";
    if (!isJpgOrPng) {
      api.error({
        message: "Lỗi",
        description: "Chỉ cho phép tải lên file JPG/PNG",
      });
      return Upload.LIST_IGNORE;
    }
    const isLt1M = file.size / 1024 / 1024 < 1;
    if (!isLt1M) {
      api.error({
        message: "Lỗi",
        description: "Kích thước hình ảnh phải nhỏ hơn 1MB!",
      });
      return Upload.LIST_IGNORE;
    }
    return false;
  };

  const handleCreateSchedule = (film) => {
    setCurrentFilm(film);
    setCurrentSchedule(null);
    setIsFetchCinemaSystems(true);
    setIsScheduleModalVisible(true);
    setCinemaSystemId(null);

    if (!cinemaSystemId) {
      form.resetFields();
    } else {
      form.setFieldsValue({
        cinemaSystem: cinemaSystemId,
      });
    }
  };

  const handleModalSubmitSchedule = () => {
    form.validateFields().then((values) => {
      const formData = new FormData();
      formData.append("maPhim", Number(currentFilm.maPhim));
      formData.append(
        "ngayChieuGioChieu",
        values.ngayChieuGioChieu.format("DD/MM/YYYY HH:mm:ss")
      );
      formData.append("maRap", values.maRap);
      formData.append("giaVe", Number(values.giaVe));

      const action = createShowSchedule(formData);
      const successMessage = `Đã tạo lịch chiếu phim: ${currentFilm.tenPhim}`;

      dispatch(action)
        .unwrap()
        .then(() => {
          handleModalCancel();

          api.success({
            message: "Thành công",
            description: successMessage,
          });
          dispatch(
            fetchFilms({
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

  return {
    contextHolder,
    schedule,
    cinemaSystemId,
    cinemaClusters,
    cinemaSystems,
    films,
    loading,
    error,
    pagination,
    form,
    isModalVisible,
    isDeleteModalVisible,
    isScheduleModalVisible,
    currentFilm,
    currentSchedule,
    fileList,
    setIsDeleteModalVisible,
    setCurrentSchedule,
    setCinemaSystemId,
    setFileList,
    handlePageChange,
    handleEdit,
    handleDelete,
    handleDeleteConfirm,
    handleCreate,
    handleModalCancel,
    handleModalSubmit,
    handleModalSubmitSchedule,
    beforeUpload,
    handleCreateSchedule,
  };
};
