import { Button, Result } from "antd";

const ErrorResult = ({ error }) => (
  <div className="p-4">
    <Result
      status="error"
      title="Đã xảy ra lỗi"
      subTitle={error}
      extra={[
        <Button key="reload" onClick={() => window.location.reload()}>
          Tải lại trang
        </Button>,
      ]}
    />
  </div>
);

export default ErrorResult;
