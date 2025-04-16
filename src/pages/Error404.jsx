import React from "react";
import { useNavigate } from "react-router-dom";

const Error404 = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
            <h1 className="text-6xl font-extrabold text-[#FFA500]">404</h1>
            <p className="text-2xl mt-4">Oops! Page not found</p>
            <p className="text-gray-400 mt-2 text-center max-w-md">
                Trang anh vừa click không có trong yêu cầu đề bài hoặc là trang
                không hợp lệ.
            </p>
            <button
                onClick={() => navigate("/")}
                className="mt-6 px-6 py-3 bg-[#FFA500] hover:bg-orange-600 text-black font-semibold rounded-md transition"
            >
                Quay về trang chủ
            </button>
        </div>
    );
};

export default Error404;
