import axios from "axios";
import { createBrowserHistory } from "history";

export const TOKEN = "accessTOKEN";
export const USER_LOGIN = "userLogin";

export const navigateHistory = createBrowserHistory();

const DOMAIN = "https://movienew.cybersoft.edu.vn/api";
const TOKEN_CYBERSOFT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBTw6FuZyAxNSIsIkhldEhhblN0cmluZyI6IjA3LzA5LzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc1NzIwMzIwMDAwMCIsIm5iZiI6MTczMzg1MDAwMCwiZXhwIjoxNzU3MzUwODAwfQ.zoAjm1IZbVPigBMr3IPv0C22H2cjx0RFMJL2FkRoXeo";

// Cấu hình axios
export const http = axios.create({
  baseURL: DOMAIN,
  timeout: 3000,
});

// Hàm set cookie
export function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Hàm lấy cookie
export function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

// Hàm xóa cookie
export function deleteCookie(name) {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

// Hàm giải mã JWT
function decodeJWT(token) {
  if (!token) {
    console.error("No token provided");
    return null;
  }
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("Invalid JWT token:", e);
    return null;
  }
}

// Hàm kiểm tra xem token đã hết hạn chưa
function isTokenExpired(token) {
  if (!token) {
    console.error("No token available to check expiration");
    return true; // Nếu không có token, coi như token đã hết hạn
  }
  const decoded = decodeJWT(token);
  if (!decoded || !decoded.exp) {
    return true;
  }
  const expirationDate = new Date(decoded.exp * 1000);
  const currentDate = new Date();
  return expirationDate < currentDate;
}

// Thêm interceptor request cho axios
http.interceptors.request.use(
  (req) => {
    const accessToken = localStorage.getItem(TOKEN);
    console.log("accessToken: ", accessToken);

    if (accessToken) {
      req.headers.Authorization = `Bearer ${accessToken}`;
    }

    req.headers.TokenCybersoft = TOKEN_CYBERSOFT;

    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Thêm interceptor response cho axios
http.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const token = localStorage.getItem(TOKEN);
    if (token) {
      const isExpired = isTokenExpired(token);
      if (isExpired) {
        try {
          const res = await http.post(
            "/Users/refreshToken",
            {},
            {
              headers: {
                Authorization: token,
                TokenCybersoft: TOKEN_CYBERSOFT,
              },
            }
          );
          localStorage.setItem(TOKEN, res.data.content.accessToken);
          console.log("Token refreshed successfully.");
        } catch (error) {
          console.log(error.message);
          navigateHistory.push(window.location.pathname);
        }
      }
    } else {
      console.error("No token found in localStorage.");
    }

    console.error(err.response.status, "error");
    switch (err.response.status) {
      case 400:
        alert("sai tham số");
        navigateHistory.push("/");
        break;
      case 401:
        navigateHistory.push("/login");
        break;
      case 403:
        alert("yeu cau quan tri vien moi co the truy cap");
        navigateHistory.push("/login");
        break;
      case 404:
        alert("duong dan khong hop le");
        navigateHistory.push("/");
        break;
      case 500:
        alert("loi server");
        navigateHistory.push("/");
        break;
    }
    return Promise.reject(err);
  }
);
