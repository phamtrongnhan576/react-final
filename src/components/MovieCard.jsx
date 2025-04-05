import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Space, Modal } from "antd";
import { FaPlay, FaStar } from "react-icons/fa";

const MovieCard = ({ movie, isShowing }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [trailerUrl, setTrailerUrl] = useState("");

    const showModal = () => {
        console.log("Opening modal with trailer:", movie.trailer);
        const url = getEmbedUrl(movie.trailer);
        setTrailerUrl(url);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setTrailerUrl("");
        setIsModalVisible(false);
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
        <div className="group relative overflow-hidden rounded-lg transition-transform">
            <div className="aspect-[2/3] bg-gray-800 rounded-lg overflow-hidden">
                {movie.hinhAnh ? (
                    <img
                        src={movie.hinhAnh}
                        alt={movie.tenPhim}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                ) : (
                    <div className="flex items-center justify-center w-full h-full text-red-600">
                        Poster {movie.tenPhim}
                    </div>
                )}

                {movie.danhGia && (
                    <div className="absolute top-0 right-0 flex items-center bg-black/50 px-4 py-2 rounded-bl-md">
                        <FaStar className="text-yellow-400 mr-1 text-base" />
                        <span className="text-white font-bold text-base">
                            {movie.danhGia}
                        </span>
                    </div>
                )}

                <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 bg-black/25 opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
            </div>

            <Modal
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
                width={800}
                centered
                destroyOnClose
            >
                {trailerUrl ? (
                    <iframe
                        width="100%"
                        height="400"
                        src={trailerUrl}
                        title="Trailer"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                ) : (
                    <p>Trailer không khả dụng</p>
                )}
            </Modal>
            <>
                <div className="absolute bottom-[50%] left-[50%] translate-x-[-50%] bg-opacity-70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                        shape="circle"
                        icon={<FaPlay />}
                        type="primary"
                        danger
                        onClick={showModal}
                        style={{
                            width: 60,
                            height: 60,
                            fontSize: 24,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    />
                </div>
                <div className="absolute bottom-[10%] left-[50%] translate-x-[-50%] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 px-4 py-3 rounded-xl flex-col">
                    <div className="text-white text-lg font-semibold mb-2 text-center whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px]">
                        {movie.tenPhim}
                    </div>
                    <Space size="middle">
                        {isShowing && (
                            <Link to={`/movies/${movie.id}`}>
                                <Button type="primary" danger size="large">
                                    Đặt vé
                                </Button>
                            </Link>
                        )}
                        <Link to={`/movies/${movie.id}/details`}>
                            <Button type="default" size="large">
                                Xem chi tiết
                            </Button>
                        </Link>
                    </Space>
                </div>
            </>
        </div>
    );
};

export default MovieCard;
