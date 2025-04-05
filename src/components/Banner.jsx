import React, { useState } from "react";
import Slider from "react-slick";
import bannerData from "../assets/json/banner.json";
import { Modal } from "antd";

const Banner = () => {
    const [toggler, setToggler] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const openLightbox = (index) => {
        // console.log("Opening modal with index:", index);
        // console.log("Raw Trailer URL:", bannerData[index]?.trailer); // In URL gốc
        setCurrentImageIndex(index);
        setToggler(true);
    };

    const handleClose = () => {
        setToggler(false);
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

    const getEmbedUrl = (url) => {
        if (!url) return "";

        if (url.includes("youtube.com") || url.includes("youtu.be")) {
            if (url.includes("watch?v=")) {
                const videoId = url.split("watch?v=")[1].split("&")[0];
                return `https://www.youtube.com/embed/${videoId}`;
            }

            if (url.includes("youtu.be")) {
                const videoId = url.split("youtu.be/")[1].split("?")[0];
                return `https://www.youtube.com/embed/${videoId}`;
            }
        }
        return url;
    };

    return (
        <div className="relative w-full h-[600px]">
            <div className={toggler ? "pointer-events-none" : ""}>
                <Slider {...settings}>
                    {bannerData.map((banner, index) => (
                        <div key={banner.maBanner} className="relative">
                            <img
                                src={banner.hinhAnh}
                                alt={banner.tenPhim}
                                className="w-full h-[600px] object-cover object-center"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/50 to-black/80" />
                            <div
                                className="absolute inset-0 flex items-center"
                                onClick={() => openLightbox(index)}
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
                                            Release: {banner.ngayPhatHanh}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>

            <Modal
                open={toggler}
                onCancel={handleClose}
                footer={null}
                width={800}
                centered
            >
                <div className="w-full h-[450px]">
                    {bannerData[currentImageIndex]?.trailer ? (
                        <iframe
                            width="100%"
                            height="100%"
                            src={getEmbedUrl(
                                bannerData[currentImageIndex]?.trailer
                            )}
                            title={bannerData[currentImageIndex]?.tenPhim}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    ) : (
                        <p>Trailer không khả dụng</p>
                    )}
                </div>
            </Modal>
        </div>
    );
};

export default Banner;
