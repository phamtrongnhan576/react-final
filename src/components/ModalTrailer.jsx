// src/components/ModalTrailer.js
import React from "react";
import { Modal } from "antd";

const ModalTrailer = ({ isOpen, onClose, embedUrl, title }) => {
    return (
        <Modal
            open={isOpen}
            onCancel={onClose}
            footer={null}
            width={800}
            centered
            destroyOnClose={true} // Đảm bảo modal hủy toàn bộ nội dung khi đóng
            aria-labelledby="video-modal-title"
        >
            <div className="relative" style={{ paddingTop: "56.25%" }}>
                {isOpen && embedUrl ? (
                    <iframe
                        src={`${embedUrl}?autoplay=1`}
                        title={title || "Video Trailer"}
                        className="absolute top-0 left-0 w-full h-full"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                ) : (
                    <p className="text-center text-gray-500 py-10 absolute top-0 left-0 w-full">
                        Trailer không khả dụng
                    </p>
                )}
            </div>
        </Modal>
    );
};

export default ModalTrailer;
