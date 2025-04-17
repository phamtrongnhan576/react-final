import {
  Modal,
  Form,
  Input,
  Button,
  Upload,
  DatePicker,
  InputNumber,
  Switch,
  Image,
} from "antd";
import {
  UploadOutlined,
  CalendarOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";

const FilmFormModal = ({
  visible,
  onCancel,
  onSubmit,
  form,
  currentFilm,
  fileList,
  setFileList,
  beforeUpload,
}) => (
  <Modal
    title={currentFilm ? "Chỉnh sửa phim" : "Thêm phim mới"}
    open={visible}
    onOk={onSubmit}
    onCancel={onCancel}
    okText={currentFilm ? "Lưu thay đổi" : "Tạo phim"}
    cancelText="Hủy bỏ"
    width={900}
    okButtonProps={{
      className: "bg-blue-600 hover:bg-blue-700",
      size: "large",
    }}
    cancelButtonProps={{ size: "large" }}
    styles={{
      body: {
        padding: "32px",
        maxHeight: "70vh",
        overflowY: "auto",
      },
      header: {
        padding: "24px 32px 16px",
        borderBottom: "1px solid #f0f0f0",
      },
      footer: {
        padding: "16px 32px 24px",
        borderTop: "1px solid #f0f0f0",
      },
    }}
  >
    <Form form={form} layout="vertical" className="space-y-4 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Form.Item
            name="tenPhim"
            label="Tên phim"
            rules={[{ required: true, message: "Vui lòng nhập tên phim" }]}
          >
            <Input
              placeholder="Nhập tên phim"
              className="p-3 rounded-lg border-gray-300 hover:border-blue-500"
            />
          </Form.Item>
          <Form.Item
            name="moTa"
            label="Mô tả"
            rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
          >
            <Input.TextArea
              rows={5}
              placeholder="Nhập mô tả chi tiết về phim..."
              className="rounded-lg border-gray-300 hover:border-blue-500"
            />
          </Form.Item>
          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="ngayKhoiChieu"
              label="Ngày chiếu"
              rules={[{ required: true, message: "Vui lòng chọn ngày" }]}
            >
              <DatePicker
                format="DD/MM/YYYY"
                placeholder="Chọn ngày"
                className="w-full p-2 rounded-lg border-gray-300"
                suffixIcon={<CalendarOutlined />}
              />
            </Form.Item>
            <Form.Item
              name="danhGia"
              label="Đánh giá"
              rules={[{ required: true, message: "Vui lòng nhập đánh giá" }]}
            >
              <InputNumber
                min={1}
                max={10}
                placeholder="1-10"
                className="w-full p-2 rounded-lg border-gray-300"
              />
            </Form.Item>
          </div>
          <Form.Item
            name="trailer"
            label="Link Trailer"
            rules={[{ required: true, message: "Vui lòng nhập link trailer" }]}
          >
            <Input
              placeholder="https://youtube.com/embed/..."
              className="p-2 rounded-lg border-gray-300"
              prefix={<YoutubeOutlined />}
            />
          </Form.Item>
          <div className="flex space-x-6">
            <Form.Item name="hot" label="Nổi bật" valuePropName="checked">
              <Switch className="bg-gray-300" />
            </Form.Item>
            <Form.Item
              name="sapChieu"
              label="Sắp chiếu"
              valuePropName="checked"
            >
              <Switch className="bg-gray-300" />
            </Form.Item>
          </div>
        </div>
        <Form.Item
          label="Hình ảnh phim"
          name="hinhAnh"
          rules={[
            { required: !fileList, message: "Vui lòng tải lên hình ảnh" },
          ]}
        >
          <Upload
            fileList={fileList}
            beforeUpload={beforeUpload}
            onChange={({ fileList: newFileList }) => setFileList(newFileList)}
            showUploadList={true}
            accept=".jpg,.jpeg,.png,.webp"
            maxCount={1}
          >
            <Button
              icon={<UploadOutlined />}
              type="primary"
              className="bg-blue-500 hover:bg-blue-600"
            >
              Tải lên hình ảnh
            </Button>
          </Upload>
          <p className="text-xs text-gray-400">
            Chấp nhận file JPG, PNG (tối đa 1MB)
          </p>

          <div
            className="mt-4 border border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center"
            style={{ minHeight: "350px" }}
          >
            {fileList.length > 0 ? (
              <>
                <Image
                  src={
                    fileList[0].url ||
                    (fileList[0].originFileObj
                      ? URL.createObjectURL(fileList[0].originFileObj)
                      : "")
                  }
                  alt="Preview"
                  className="object-contain"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "300px",
                    aspectRatio: "3/4",
                  }}
                />
                <p className="mt-2 text-sm text-gray-500 text-center">
                  {fileList[0].name}{" "}
                  {fileList[0].size
                    ? `(${Math.round(fileList[0].size / 1024)} KB)`
                    : ""}
                </p>
              </>
            ) : (
              <p className="text-sm text-gray-500">
                Chưa có hình ảnh nào được chọn
              </p>
            )}
          </div>
        </Form.Item>
      </div>
    </Form>
  </Modal>
);

export default FilmFormModal;
