import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Tabs, Spin, Alert } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { getCinemaList, getCinemaShowtime } from "../api/moivesAPI";

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

    // Tạo items cho Tabs
    const items = cinemaList?.map((cinema) => {
        return {
            key: cinema.maHeThongRap,
            label: (
                <div className="w-16 h-16 rounded-lg overflow-hidden p-1 bg-white mr-3">
                    <img
                        src={cinema.logo}
                        alt={cinema.tenHeThongRap}
                        className="w-full h-full object-contain"
                    />
                </div>
            ),
            children: (
                <div className="bg-[#2a2e38] p-6 rounded-xl text-white min-h-[500px]">
                    <div className="flex items-center gap-4 mb-6">
                        <img
                            src={cinema.logo}
                            alt={cinema.tenHeThongRap}
                            className="w-14 h-14 object-contain rounded-full bg-white p-1"
                        />
                        <p className="text-2xl text-[#FFA500]">
                            {cinema.tenHeThongRap}
                        </p>
                    </div>
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
