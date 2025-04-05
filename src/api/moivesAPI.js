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
