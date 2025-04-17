import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Spin, Alert, Modal } from "antd";
import { useParams } from "react-router-dom";
import { getSeatList, bookTickets } from "../api/moivesAPI";

import { Notyf } from "notyf";
import "notyf/notyf.min.css";

const SeatSelection = () => {
    const { maLichChieu } = useParams();
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const notyf = new Notyf();

    const { data, isLoading, error } = useQuery({
        queryKey: ["seatList", maLichChieu],
        queryFn: () => getSeatList(maLichChieu),
        enabled: !!maLichChieu,
    });

    const handleSeatClick = (ghe) => {
        if (!ghe.daDat) {
            setSelectedSeats((prev) => {
                const isSelected = prev.some(
                    (seat) => seat.maGhe === ghe.maGhe
                );
                return isSelected
                    ? prev.filter((seat) => seat.maGhe !== ghe.maGhe)
                    : [...prev, ghe];
            });
        }
    };

    const handleSubmit = () => {
        setIsModalVisible(true);
    };

    const totalPrice = selectedSeats.reduce((acc, seat) => acc + seat.giaVe, 0);

    const handleBookTicket = async () => {
        try {
            const response = await bookTickets(maLichChieu, selectedSeats);
            if (response && response.statusCode === 200) {
                notyf.success("Đặt vé thành công!");
                setIsModalVisible(false);
                setSelectedSeats([]);
            } else {
                throw new Error(response.message || "Đặt vé thất bại");
            }
        } catch (error) {
            notyf.error(error.message || "Có lỗi xảy ra khi đặt vé");
        }
    };

    if (isLoading)
        return <Spin size="large" className="flex justify-center mt-10" />;

    if (error)
        return (
            <Alert
                message="Lỗi"
                description="Không thể tải danh sách ghế. Vui lòng thử lại sau."
                type="error"
                showIcon
                className="m-4"
            />
        );

    if (!data) return null;

    const { thongTinPhim, danhSachGhe } = data;

    const rows = [];
    for (let i = 0; i < danhSachGhe.length; i += 16) {
        rows.push(danhSachGhe.slice(i, i + 16));
    }

    return (
        <div className="bg-black pt-25 pb-5">
            <div className="container p-4 ">
                <div className="bg-gray-800 text-white p-4 rounded-lg mb-6">
                    <h1 className="text-2xl font-bold mb-2">
                        {thongTinPhim.tenPhim}
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div>
                            <span className="text-gray-400">Rạp:</span>{" "}
                            {thongTinPhim.tenCumRap}
                        </div>
                        <div>
                            <span className="text-gray-400">Giờ chiếu:</span>{" "}
                            {thongTinPhim.gioChieu}
                        </div>
                        <div>
                            <span className="text-gray-400">Ngày chiếu:</span>{" "}
                            {thongTinPhim.ngayChieu}
                        </div>
                        <div>
                            <span className="text-gray-400">Phòng:</span>{" "}
                            {thongTinPhim.tenRap}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Khu vực ghế */}
                    <div className="flex-1">
                        <div className="bg-gray-800 p-4 rounded-lg">
                            <div className="text-center text-white mb-4">
                                <div className="text-lg font-medium">
                                    MÀN HÌNH
                                </div>
                                <div className="h-1 bg-orange-500 w-1/3 mx-auto mt-2"></div>
                            </div>

                            {/* Lưới ghế */}
                            <div className="space-y-2">
                                {rows.map((row, rowIndex) => (
                                    <div
                                        key={rowIndex}
                                        className="flex justify-center gap-1"
                                    >
                                        {row.map((ghe) => {
                                            const isSelected =
                                                selectedSeats.some(
                                                    (s) => s.maGhe === ghe.maGhe
                                                );
                                            const isBooked = ghe.daDat;
                                            const isVip = ghe.loaiGhe === "Vip";

                                            return (
                                                <button
                                                    key={ghe.maGhe}
                                                    onClick={() =>
                                                        handleSeatClick(ghe)
                                                    }
                                                    disabled={isBooked}
                                                    className={`
                            w-8 h-8 rounded-sm text-xs font-bold flex items-center justify-center
                            ${
                                isBooked
                                    ? "bg-gray-600 cursor-not-allowed"
                                    : isSelected
                                    ? "bg-green-500 text-white"
                                    : isVip
                                    ? "bg-yellow-500 hover:bg-yellow-400"
                                    : "bg-gray-300 hover:bg-gray-200"
                            }
                          `}
                                                    title={`Ghế ${
                                                        ghe.tenGhe
                                                    } - ${ghe.giaVe.toLocaleString()}đ`}
                                                >
                                                    {ghe.tenGhe}
                                                </button>
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>

                            {/* Chú thích */}
                            <div className="mt-6 flex flex-wrap justify-center gap-4 text-white text-sm">
                                {[
                                    { color: "bg-gray-300", label: "Thường" },
                                    { color: "bg-yellow-500", label: "VIP" },
                                    {
                                        color: "bg-green-500",
                                        label: "Đang chọn",
                                    },
                                    { color: "bg-gray-600", label: "Đã đặt" },
                                ].map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-2"
                                    >
                                        <div
                                            className={`w-4 h-4 ${item.color}`}
                                        ></div>
                                        <span>{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-96 bg-gray-800 p-6 rounded-lg text-white">
                        <h2 className="text-xl font-bold mb-4">
                            Thông tin đặt vé
                        </h2>
                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <span>Số lượng ghế:</span>
                                <span className="font-medium">
                                    {selectedSeats.length}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span>Tổng tiền:</span>
                                <span className="text-orange-500 font-bold">
                                    {totalPrice.toLocaleString()}đ
                                </span>
                            </div>

                            <div className="pt-4 mt-4 border-t border-gray-700">
                                <button
                                    className={`w-full py-3 rounded-lg font-bold transition-colors ${
                                        selectedSeats.length > 0
                                            ? "bg-orange-500 hover:bg-orange-600"
                                            : "bg-gray-600 cursor-not-allowed"
                                    }`}
                                    disabled={selectedSeats.length === 0}
                                    onClick={handleSubmit}
                                >
                                    Đặt vé
                                </button>
                            </div>

                            {selectedSeats.length > 0 && (
                                <div className="mt-6">
                                    <h3 className="font-bold mb-2">
                                        Ghế đã chọn:
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedSeats.map((seat) => (
                                            <span
                                                key={seat.maGhe}
                                                className="px-3 py-1 bg-gray-700 rounded-full text-sm"
                                            >
                                                {seat.tenGhe} ({seat.loaiGhe})
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                title="Xác nhận"
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                onOk={handleBookTicket}
            >
                <p>
                    Bạn có chắc chắn muốn đặt {selectedSeats.length} ghế với
                    tổng số tiền là {totalPrice.toLocaleString()}đ?
                </p>
            </Modal>
        </div>
    );
};

export default SeatSelection;
