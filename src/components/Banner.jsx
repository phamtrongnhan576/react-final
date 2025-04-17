// src/components/Banner.jsx
import React, { useState, useMemo } from "react";
import Slider from "react-slick";
import bannerData from "../assets/json/banner.json";
import ModalTrailer from "../components/ModalTrailer";
import { getYoutubeEmbedUrl } from "../utils/youtube";

const Banner = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const banners = useMemo(() => {
        if (!Array.isArray(bannerData) || bannerData.length === 0) {
            return [
                {
                    maBanner: "default",
                    hinhAnh: "https://placehold.co/600x400/png",
                    tenPhim: "Không có banner",
                    moTa: "",
                    ngayPhatHanh: "N/A",
                    trailer: "",
                },
            ];
        }
        return bannerData;
    }, []);

    const handleOpenModal = (index) => {
        const embedUrl = getYoutubeEmbedUrl(banners[index]?.trailer);
        if (embedUrl) {
            setCurrentImageIndex(index);
            setIsModalVisible(true);
        }
    };

    const settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        fade: true,
    };

    return (
        <div className="relative w-full h-[600px]">
            <Slider {...settings}>
                {banners.map((banner, index) => (
                    <div key={banner.maBanner} className="relative">
                        <img
                            src={banner.hinhAnh}
                            alt={banner.tenPhim || "Movie Banner"}
                            className="w-full h-[600px] object-cover object-center"
                            onError={(e) =>
                                (e.target.src =
                                    "https://placehold.co/600x400/png")
                            }
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/50 to-black/80" />
                        <div
                            className="absolute inset-0 flex items-center cursor-pointer"
                            onClick={() => handleOpenModal(index)}
                            role="button"
                            tabIndex={0}
                            aria-label={`Mở trailer cho ${
                                banner.tenPhim || "phim"
                            }`}
                            onKeyDown={(e) =>
                                e.key === "Enter" && handleOpenModal(index)
                            }
                        >
                            <div className="container p-10">
                                <div className="max-w-2xl translate-y-[20px]">
                                    <p className="text-lg text-gray-200">
                                        {banner.moTa}
                                    </p>
                                    <h2 className="text-7xl font-bold mb-3 leading-tight">
                                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-[#FFA500]">
                                            {banner.tenPhim}
                                        </span>
                                        <div className="w-16 h-[3px] bg-orange-400 rounded-full"></div>
                                    </h2>
                                    <p className="text-gray-200">
                                        Release: {banner.ngayPhatHanh || "N/A"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>

            <ModalTrailer
                isOpen={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                embedUrl={getYoutubeEmbedUrl(
                    banners[currentImageIndex]?.trailer
                )}
                title={banners[currentImageIndex]?.tenPhim || "Movie Trailer"}
            />
        </div>
    );
};

export default Banner;
