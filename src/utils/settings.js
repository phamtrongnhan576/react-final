import axios from "axios";
export const TOKEN = "accessTOKEN";
export const USER_LOGIN = "userLogin";

import { createBrowserHistory } from "history";
export const navigateHistory = createBrowserHistory();
export function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
export function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
export function deleteCookie(name) {
    document.cookie =
        name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

function decodeJWT(token) {
    try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split("")
                .map(function (c) {
                    return (
                        "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
                    );
                })
                .join("")
        );

        return JSON.parse(jsonPayload);
    } catch (e) {
        console.error("Invalid JWT token:", e);
        return null;
    }
}

function isTokenExpired(token) {
    const decoded = decodeJWT(token);
    if (!decoded || !decoded.exp) {
        return true;
    }
    const expirationDate = new Date(decoded.exp * 1000);
    const currentDate = new Date();
    return expirationDate < currentDate;
}

const DOMAIN = "https://movienew.cybersoft.edu.vn/api";
const TOKEN_CYBERSOFT =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBTw6FuZyAxNSIsIkhldEhhblN0cmluZyI6IjA3LzA5LzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc1NzIwMzIwMDAwMCIsIm5iZiI6MTczMzg1MDAwMCwiZXhwIjoxNzU3MzUwODAwfQ.zoAjm1IZbVPigBMr3IPv0C22H2cjx0RFMJL2FkRoXeo";

export const http = axios.create({
    baseURL: DOMAIN,
    timeout: 3000,
});

http.interceptors.request.use(
    (req) => {
        const accessToken = localStorage.getItem(TOKEN);

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

// http.interceptors.response.use(
//     (res) => {
//         return res;
//     },
//     async (err) => {
//         const isExpired = isTokenExpired(localStorage.getItem(TOKEN));
//         if (isExpired) {
//             try {
//                 const res = await http.post(
//                     "/Users/refreshToken",
//                     {},
//                     {
//                         headers: {
//                             Authorization: localStorage.getItem(TOKEN),
//                         },
//                     }
//                 );
//                 localStorage.setItem(TOKEN, res.data.content.accessToken);
//             } catch (_) {
//                 navigateHistory.push(window.location.pathname);
//             }
//         }
//         console.error(err.response.status, "error");
//         switch (err.response.status) {
//             case 400:
//                 alert("sai tham số");
//                 navigateHistory.push("/");
//                 break;
//             case 401:
//                 navigateHistory.push("/login");
//                 break;
//             case 403:
//                 alert("yeu cau quan tri vien moi co the truy cap");
//                 navigateHistory.push("/login");
//                 break;
//             case 404:
//                 alert("duong dan khong hop le");
//                 navigateHistory.push("/");
//                 break;
//             case 500:
//                 alert("loi server");
//                 navigateHistory.push("/");
//                 break;
//         }
//         return Promise.reject(err);
//     }
// );
