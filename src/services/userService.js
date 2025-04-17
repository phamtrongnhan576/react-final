import apiClient from "./api.js";

const UserService = {
  // Tìm kiếm người dùng phân trang
  searchUsersPaginated: async (keyword, currentPage = 1, itemsPerPage = 10) => {
    try {
      const response = await apiClient.get(
        `/api/QuanLyNguoiDung/TimKiemNguoiDungPhanTrang?MaNhom=GP01&tuKhoa=${keyword}&soTrang=${currentPage}&soPhanTuTrenTrang=${itemsPerPage}`
      );

      const responseData = response.data || {};

      if (responseData.content?.items) {
        return {
          items: responseData.content.items || [],
          totalCount: responseData.content.totalCount || 0,
          totalPages: responseData.content.totalPages || 0,
        };
      }
    } catch (error) {
      console.error("Error searching user data:", error);
      throw error;
    }
  },

  // Lấy danh sách người dùng phân trang
  getUsersPaginated: async (currentPage = 1, itemsPerPage = 10) => {
    try {
      const response = await apiClient.get(
        `/api/QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang?maNhom=GP01&soTrang=${currentPage}&soPhanTuTrenTrang=${itemsPerPage}`
      );

      const responseData = response.data || {};

      if (responseData.content?.items) {
        return {
          items: responseData.content.items || [],
          totalCount: responseData.content.totalCount || 0,
          totalPages: responseData.content.totalPages || 0,
        };
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  },

  // Xóa người dùng
  deleteUser: async (taiKhoan) => {
    try {
      const response = await apiClient.delete(
        `/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`
      );
      return response.data || taiKhoan;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  },

  // Cập nhật người dùng (dùng POST vì backend này xài kiểu "form upload")
  updateUser: async (userData) => {
    try {
      const response = await apiClient.post(
        "/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
        userData
      );
      return response.data || userData;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  },

  // Thêm người dùng
  addUser: async (userData) => {
    try {
      const response = await apiClient.post(
        "/api/QuanLyNguoiDung/ThemNguoiDung",
        userData
      );
      return response.data || userData;
    } catch (error) {
      console.error("Error adding user:", error);
      throw error;
    }
  },
};

export default UserService;
