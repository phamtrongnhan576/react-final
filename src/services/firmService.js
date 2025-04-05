import apiClient from "./api.js";

const FirmService = {
  /**
   * Lấy danh sách phim phân trang
   * @param {number} page - Trang hiện tại (bắt đầu từ 1)
   * @param {number} itemsPerPage - Số phần tử mỗi trang
   * @returns {Promise<{items: Array, totalItems: number, totalPages: number}>}
   */
  getFilmsPaginated: async (page = 1, itemsPerPage = 10) => {
    try {
      const response = await apiClient.get(
        `/api/QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=GP01&soTrang=${page}&soPhanTuTrenTrang=${itemsPerPage}`
      );

      // Xử lý nhiều cấu trúc response khác nhau
      const responseData = response.data || {};

      // Trường hợp 1: Data có cấu trúc content -> items
      if (responseData.content?.items) {
        return {
          items: responseData.content.items,
          totalItems: responseData.content.totalCount || 0,
          totalPages: Math.ceil(
            (responseData.content.totalCount || 0) / itemsPerPage
          ),
        };
      }

      // Trường hợp 2: Data là mảng trực tiếp
      if (Array.isArray(responseData)) {
        return {
          items: responseData,
          totalItems: responseData.length,
          totalPages: 1,
        };
      }

      // Trường hợp 3: Data không xác định
      return {
        items: [],
        totalItems: 0,
        totalPages: 0,
      };
    } catch (error) {
      console.error("Error fetching paginated film data:", error);
      throw error;
    }
  },

  deleteFilm: async (filmId) => {
    try {
      const response = await apiClient.delete(
        `/api/QuanLyPhim/XoaPhim?MaPhim=${filmId}`
      );
      return response.data || filmId;
    } catch (error) {
      console.error("Error deleting film:", error);
      throw error;
    }
  },

  updateFilm: async (filmData) => {
    try {
      const response = await apiClient.post(
        "/api/QuanLyPhim/CapNhatPhimUpload",
        filmData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data || filmData;
    } catch (error) {
      console.error("Error updating film:", error);
      throw error;
    }
  },

  addFilm: async (filmData) => {
    try {
      const response = await apiClient.post(
        "/api/QuanLyPhim/ThemPhimUploadHinh",
        filmData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data || filmData;
    } catch (error) {
      console.error("Error adding film:", error);
      throw error;
    }
  },
};

export default FirmService;
