import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
const ShowtimesByDay = ({ dayInTab, cumRaps }) => {
    return (
        <div className="p-5 bg-[#1f232b] rounded-md h-full">
            {cumRaps.length === 0 ? (
                <p className="text-sm text-gray-300">
                    Không có dữ liệu suất chiếu.
                </p>
            ) : (
                (() => {
                    const allShowtimes = cumRaps.flatMap(
                        (cumRap) =>
                            cumRap.lichChieuPhim?.filter(
                                (lich) =>
                                    moment(lich.ngayChieuGioChieu).day() ===
                                    dayInTab
                            ) || []
                    );

                    if (allShowtimes.length === 0) {
                        return (
                            <p className="text-sm text-gray-400 italic">
                                Hiện không có suất chiếu cho ngày này.
                            </p>
                        );
                    }

                    return cumRaps.map((cumRap) => {
                        const lichChieuTrongThu =
                            cumRap.lichChieuPhim?.filter(
                                (lich) =>
                                    moment(lich.ngayChieuGioChieu).day() ===
                                    dayInTab
                            ) || [];

                        if (lichChieuTrongThu.length === 0) return null;

                        return (
                            <div key={cumRap.maCumRap}>
                                <h3 className="text-lg font-semibold mb-2 text-white">
                                    {cumRap.tenCumRap}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {lichChieuTrongThu.map((lich) => (
                                        <div
                                            key={lich.maLichChieu}
                                            className="px-3 py-1 rounded bg-gray-700 hover:bg-[#ffa500] transition cursor-pointer mb-2"
                                        >
                                            <Link
                                                to={`/SeatSelection/${lich.maLichChieu}`}
                                            >
                                                {moment(
                                                    lich.ngayChieuGioChieu
                                                ).format("HH:mm")}
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    });
                })()
            )}
        </div>
    );
};

export default ShowtimesByDay;
