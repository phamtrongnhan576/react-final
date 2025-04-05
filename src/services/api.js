import axios from "axios";

//minhnv123@gmail.com
//minhnv123
//123123

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    TokenCybersoft: import.meta.env.VITE_API_TOKEN_CYBERSOFT,
    Authorization: `Bearer ${import.meta.env.VITE_API_ACCESS_TOKEN}`,
  },
});

// Xử lý response/error chung
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Xử lý lỗi chung ở đây
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export default apiClient;
