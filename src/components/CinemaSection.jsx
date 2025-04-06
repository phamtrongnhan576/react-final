import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Tabs, Spin, Alert } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { getCinemaList, getCinemaShowtime } from "../api/moivesAPI";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
const CinemaSection = () => {
    const {
        data: cinemaList,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["cinemaList"],
        queryFn: getCinemaList,
    });

    const {
        data: cinemaShowtime,
        isLoading: isCinemaLoading,
        error: errorCinema,
    } = useQuery({
        queryKey: ["ShowtimeMovies", "GP01"],
        queryFn: () => getCinemaShowtime("GP01"),
        enabled: !!"GP01",
    });

    console.log("cinemaList", cinemaList);
    console.log("cinemaShowtime", cinemaShowtime);
    if (isLoading || isCinemaLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Spin
                    indicator={
                        <LoadingOutlined style={{ fontSize: 40 }} spin />
                    }
                    size="large"
                />
                <span className="ml-2">Loading...</span>
            </div>
        );
    }

    if (error || errorCinema) {
        return (
            <div className="max-w-3xl mx-auto">
                <Alert
                    message="Lỗi"
                    description={`Lỗi khi tải dữ liệu: ${
                        error?.message || errorCinema?.message
                    }`}
                    type="error"
                    showIcon
                />
            </div>
        );
    }
    const items = cinemaList?.map((cinema) => {
        const matchedShowtime = cinemaShowtime?.find(
            (item) => item.maHeThongRap === cinema.maHeThongRap
        );

        const sanitizeKey = (key) => key.replace(/[^a-zA-Z0-9-_]/g, "-");

        return {
            key: sanitizeKey(cinema.maHeThongRap),
            label: (
                <div className="w-16 h-16 rounded-lg overflow-hidden p-1 bg-white mr-3">
                    <img
                        src={cinema.logo || "https://placehold.co/600x400/png"}
                        alt={cinema.tenHeThongRap}
                        className="w-full h-full object-contain"
                        onError={(e) =>
                            (e.target.src = "https://placehold.co/600x400/png")
                        }
                    />
                </div>
            ),
            children: (
                <div className="bg-[#2a2e38] p-6 rounded-xl text-white h-[500px] ">
                    <Tabs tabPosition="left" className="h-full ">
                        {matchedShowtime?.lstCumRap?.map((cumRap) => (
                            <Tabs.TabPane
                                key={sanitizeKey(cumRap.maCumRap)}
                                tab={
                                    <div className="flex items-center max-w-[500px]  mr-3">
                                        <img
                                            src={
                                                cumRap.hinhAnh ||
                                                "https://placehold.co/600x400/png"
                                            }
                                            alt={cumRap.tenCumRap}
                                            className="w-[100px] h-[100px] object-cover mr-4 rounded"
                                            onError={(e) =>
                                                (e.target.src =
                                                    "https://placehold.co/600x400/png")
                                            }
                                        />
                                        <div className="flex flex-col max-w-[250px]">
                                            <h3 className="text-xl font-semibold text-white overflow-hidden text-ellipsis whitespace-nowrap  text-left">
                                                {cumRap.tenCumRap}
                                            </h3>
                                            <p className="mt-2 text-sm text-gray-400 line-clamp-2 text-wrap text-left">
                                                Địa chỉ: {cumRap.diaChi}
                                            </p>
                                        </div>
                                    </div>
                                }
                            >
                                <div className="overflow-y-auto h-[450px] scrollbar-small scrollbar-thumb-gray-500 scrollbar-track-gray-200">
                                    {cumRap.danhSachPhim
                                        ?.filter(
                                            (phim) =>
                                                phim.dangChieu && !phim.sapChieu
                                        )
                                        .map((phim) => (
                                            <div
                                                key={phim.maPhim}
                                                className="flex items-start mb-6 space-x-4 border-b border-gray-700 pb-4"
                                            >
                                                <div className="w-[90px] aspect-[2/3] overflow-hidden rounded-lg">
                                                    <img
                                                        src={
                                                            phim.hinhAnh ||
                                                            "https://placehold.co/100x100/png"
                                                        }
                                                        alt={phim.tenPhim}
                                                        className="w-full h-full object-cover"
                                                        onError={(e) =>
                                                            (e.target.src =
                                                                "https://placehold.co/100x100/png")
                                                        }
                                                    />
                                                </div>
                                                <div className="flex-1 w-full">
                                                    <h4 className="text-lg font-semibold text-white w-[200px] text-ellipsis whitespace-wrap line-clamp-2">
                                                        {phim.tenPhim}
                                                    </h4>
                                                    <div className="flex flex-wrap gap-2 mt-2">
                                                        {phim.lstLichChieuTheoPhim.map(
                                                            (lichChieu) => (
                                                                <div
                                                                    key={
                                                                        lichChieu.maLichChieu
                                                                    }
                                                                    className="bg-gray-800 p-2 rounded-md hover:bg-orange-500 transition-all"
                                                                >
                                                                    <span className="text-sm text-white">
                                                                        {new Date(
                                                                            lichChieu.ngayChieuGioChieu
                                                                        ).toLocaleTimeString(
                                                                            [],
                                                                            {
                                                                                hour: "2-digit",
                                                                                minute: "2-digit",
                                                                            }
                                                                        )}
                                                                    </span>
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </Tabs.TabPane>
                        ))}
                    </Tabs>
                </div>
            ),
        };
    });

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mt-7">
                <h2 className="text-lg font-bold uppercase text-white relative inline-block after:content-[''] after:block after:h-[3px] after:rounded-lg after:bg-[#FFA500] after:mt-2 after:w-full">
                    SHOWTIMES MOVIES
                </h2>
            </div>
            <div className="mt-10 bg-[#1c1f26] rounded-lg p-4">
                <Tabs
                    tabPosition="left"
                    className="cinema-tabs custom-tabs"
                    defaultActiveKey={cinemaList?.[0]?.maHeThongRap}
                    items={items}
                />
            </div>
        </div>
    );
};

export default CinemaSection;
