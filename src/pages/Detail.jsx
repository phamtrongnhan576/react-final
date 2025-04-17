import React, { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
    getMovieDetail,
    getCinemaList,
    getMovieShowtime,
} from "../api/moivesAPI";
import { Button, Spin, Alert } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import { FaPlay } from "react-icons/fa";
import moment from "moment";
import { getYoutubeEmbedUrl, getYoutubeThumbnail } from "../utils/youtube";
import ModalTrailer from "../components/ModalTrailer";
import CinemaSystemTabs from "../components/CinemaSystemTabs";
const Detail = () => {
    const { maPhim } = useParams();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [activeDayTabKeys, setActiveDayTabKeys] = useState({});

    const {
        data: movie,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["movieDetail", maPhim],
        queryFn: () => getMovieDetail(maPhim),
        enabled: !!maPhim,
    });

    const { data: cinemaList, isLoading: isLoadingCinema } = useQuery({
        queryKey: ["cinemaList"],
        queryFn: getCinemaList,
    });

    const { data: showtimeData, isLoading: isLoadingShowtime } = useQuery({
        queryKey: ["showtime", maPhim],
        queryFn: () => getMovieShowtime(maPhim),
        enabled: !!maPhim,
    });

    const isLoadingAll = isLoading || isLoadingCinema || isLoadingShowtime;

    const thumbnailUrl =
        getYoutubeThumbnail(movie?.trailer) ||
        "https://placehold.co/300x450/png";

    const embedUrl = getYoutubeEmbedUrl(movie?.trailer);

    const cinemaDayDefaults = useMemo(() => {
        if (!cinemaList || !showtimeData) return {};

        const result = {};
        cinemaList.forEach((cinema) => {
            const cinemaData = showtimeData?.heThongRapChieu?.find(
                (ht) => ht.maHeThongRap === cinema.maHeThongRap
            );
            const cumRaps = cinemaData?.cumRapChieu || [];

            for (let i = 0; i < 7; i++) {
                const tabDate = moment()
                    .startOf("week")
                    .add(i + 1, "days");
                const dayInTab = tabDate.day();

                const hasShowtime = cumRaps.some((cumRap) =>
                    cumRap.lichChieuPhim?.some(
                        (lich) =>
                            moment(lich.ngayChieuGioChieu).day() === dayInTab
                    )
                );

                if (hasShowtime) {
                    result[cinema.maHeThongRap] = String(i);
                    break;
                }
            }
        });

        return result;
    }, [cinemaList, showtimeData]);

    const handleOpenModal = () => {
        if (embedUrl) {
            setIsModalVisible(true);
        }
    };

    if (isLoadingAll) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spin size="large" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-3xl mx-auto mt-10">
                <Alert
                    message="Lỗi"
                    description={`Không thể tải thông tin phim: ${error.message}`}
                    type="error"
                    showIcon
                />
            </div>
        );
    }

    return (
        <div className="bg-black">
            <div
                className="w-full h-[550px] relative cursor-pointer"
                onClick={handleOpenModal}
                role="button"
                tabIndex={0}
                aria-label={`Mở trailer cho ${movie?.tenPhim || "phim"}`}
                onKeyDown={(e) => e.key === "Enter" && handleOpenModal()}
            >
                <img
                    src={thumbnailUrl}
                    alt={movie?.tenPhim || "Movie Thumbnail"}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        const videoId = getYoutubeVideoId(movie?.trailer);
                        e.target.src = videoId
                            ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
                            : "https://placehold.co/300x450/png";
                    }}
                />
                <div className="absolute inset-0 bg-black/30 flex justify-center items-center">
                    <Button
                        type="text"
                        icon={
                            <FaPlay
                                style={{ color: "white" }}
                                className="w-10 h-10"
                            />
                        }
                        className="hover:scale-110 transition-transform"
                    />
                </div>
            </div>

            <div className="container">
                <div className="py-10 flex flex-col md:flex-row items-center gap-8 translate-y-[-15%]">
                    <div className="w-full md:w-1/3">
                        <img
                            src={
                                movie?.hinhAnh ||
                                "https://placehold.co/300x450/png"
                            }
                            alt={movie?.tenPhim || "Movie Poster"}
                            className="w-full h-auto rounded-lg p-1 bg-white"
                            onError={(e) =>
                                (e.target.src =
                                    "https://placehold.co/300x450/png")
                            }
                        />
                    </div>
                    <div className="w-full md:w-2/3 text-white">
                        <div className="flex items-center gap-4 mb-4">
                            <h1 className="text-3xl font-bold">
                                {movie?.tenPhim}
                            </h1>
                        </div>
                        <p className="text-gray-200 text-lg mb-4 line-clamp-5 max-w-[600px]">
                            {movie?.moTa}
                        </p>
                        <div className="flex items-center gap-2 mb-3">
                            <CalendarOutlined
                                style={{ color: "orange", fontSize: "24px" }}
                            />
                            <span>
                                {movie?.ngayKhoiChieu
                                    ? moment(movie.ngayKhoiChieu).format(
                                          "DD/MM/YYYY"
                                      )
                                    : "N/A"}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="mt-10 bg-[#1c1f26] rounded-lg p-4">
                    <CinemaSystemTabs
                        cinemaList={cinemaList}
                        showtimeData={showtimeData}
                        cinemaDayDefaults={cinemaDayDefaults}
                        activeDayTabKeys={activeDayTabKeys}
                        setActiveDayTabKeys={setActiveDayTabKeys}
                    />
                </div>
            </div>

            <ModalTrailer
                isOpen={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                embedUrl={embedUrl}
                title={movie?.tenPhim || "Movie Trailer"}
            />
        </div>
    );
};

export default Detail;
