import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    TokenCybersoft: import.meta.env.VITE_API_KEY,
  },
});

// Xử lý response/error chung
apiClient.interceptors.response.use(
  (response) => response.data.content.items,
  (error) => {
    // Xử lý lỗi chung ở đây
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export default apiClient;
