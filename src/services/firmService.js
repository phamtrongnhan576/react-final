import apiClient from "./api.js";

const FirmService = {
  getFirmData: async () => {
    try {
      const response = await apiClient.get(
        "/api/QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=GP01&soTrang=1&soPhanTuTrenTrang=10"
      );
      return response;
    } catch (error) {
      console.error("Error fetching bid data:", error);
      throw error;
    }
  },
};

export default FirmService;
