import { http } from "../utils/settings";
export const getBanner = async () => {
    const res = await http.get("/QuanLyPhim/LayDanhSachBanner");
    return res.data.content;
};
export const getMovieList = async () => {
    const res = await http.get("/QuanLyPhim/LayDanhSachPhim?maNhom=GP01");
    return res.data.content;
};
export const getCinemaList = async () => {
    const res = await http.get("/QuanLyRap/LayThongTinHeThongRap");
    return res.data.content;
};

export const getCinemaShowtime = async (maHeThongRap) => {
    const res = await http.get(
        `/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${maHeThongRap}`
    );
    return res.data.content;
};
export const getMovieDetail = async (maPhim) => {
    const res = await http.get(`QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`);
    return res.data.content;
};

export const getMovieShowtime = async (maPhim) => {
    const res = await http.get(
        `/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}&maNhom=GP01`
    );
    return res.data.content;
};

export const getSeatList = async (maLichChieu) => {
    const res = await http.get(
        `/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`
    );
    return res.data.content;
};

export const checkLogin = async (loginData) => {
    const data = {};
    data["taiKhoan"] = loginData["username"];
    data["matKhau"] = loginData["password"];

    const res = await http.post("/QuanLyNguoiDung/DangNhap", data);
    return res.data.content;
};
export const signUp = async (signUpData) => {
    const res = await http.post("/QuanLyNguoiDung/DangKy", signUpData);
    return res.data.content;
};

export const bookTickets = async (maLichChieu, danhSachGhe) => {
    const data = {
        maLichChieu: maLichChieu,
        danhSachVe: danhSachGhe.map((ghe) => ({
            maGhe: ghe.maGhe,
            giaVe: ghe.giaVe,
        })),
    };

    const token = localStorage.getItem("accessToken");

    const res = await http.post("/QuanLyDatVe/DatVe", data, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json-patch+json",
        },
    });
    return res.data.content;
};
