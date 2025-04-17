import { Spin } from "antd";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Spin size="large" tip="Đang tải dữ liệu..." />
    </div>
  );
};

export default LoadingSpinner;
