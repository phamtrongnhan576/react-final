import { Modal, Form, DatePicker, Image, Select, InputNumber } from "antd";

const FilmScheduleModal = ({
  visible,
  onCancel,
  onSubmitSchedule,
  form,
  cinemaSystems,
  currentFilm,
  setCinemaSystemId,
  cinemaClusters,
  cinemaSystemId,
}) => {
  const cinemaSystemOptions = cinemaSystems.map((cinemaSystem) => ({
    value: cinemaSystem.maHeThongRap,
    label: cinemaSystem.tenHeThongRap,
  }));

  const cinemaClustersOptions = cinemaClusters.map((cinemaSystem) => ({
    value: cinemaSystem.maCumRap,
    label: cinemaSystem.tenCumRap,
  }));

  return (
    <Modal
      title={
        <div className="text-2xl font-bold text-gray-800">
          {currentFilm
            ? `Tạo lịch chiếu phim - ${currentFilm.tenPhim}`
            : "Tạo lịch chiếu phim"}
        </div>
      }
      open={visible}
      onOk={onSubmitSchedule}
      onCancel={onCancel}
      okText="Tạo lịch chiếu phim"
      cancelText="Hủy bỏ"
      width={900}
      okButtonProps={{
        className: "bg-blue-600 hover:bg-blue-700 text-white h-10 px-6",
        size: "large",
      }}
      cancelButtonProps={{
        className: "h-10 px-6 border-gray-300 hover:bg-gray-50",
        size: "large",
      }}
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
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3 flex justify-center">
          <Image
            width={250}
            src={currentFilm?.hinhAnh}
            className="rounded-lg shadow-md object-cover h-64"
            alt="Poster phim"
          />
        </div>

        <div className="w-full md:w-2/3">
          <Form form={form} layout="vertical" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <Form.Item
                name="cinemaSystem"
                label={
                  <span className="text-gray-700 font-medium">
                    Hệ thống rạp
                  </span>
                }
                rules={[
                  { required: true, message: "Vui lòng chọn hệ thống rạp" },
                ]}
              >
                <Select
                  showSearch
                  placeholder="Tìm kiếm hoặc chọn hệ thống rạp"
                  optionFilterProp="label"
                  className="w-full h-10"
                  options={cinemaSystemOptions}
                  onChange={(maHeThongRap) => {
                    setCinemaSystemId(maHeThongRap);
                    form.setFieldsValue({ maRap: undefined }); // Reset cụm rạp khi thay đổi hệ thống
                  }}
                />
              </Form.Item>

              {cinemaSystemId && (
                <Form.Item
                  name="maRap"
                  label={
                    <span className="text-gray-700 font-medium">Cụm rạp</span>
                  }
                  rules={[{ required: true, message: "Vui lòng chọn cụm rạp" }]}
                >
                  <Select
                    showSearch
                    placeholder="Tìm kiếm hoặc chọn cụm rạp"
                    optionFilterProp="label"
                    className="w-full h-10"
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? "")
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? "").toLowerCase())
                    }
                    options={cinemaClustersOptions}
                  />
                </Form.Item>
              )}

              <Form.Item
                name="ngayChieuGioChieu"
                label={
                  <span className="text-gray-700 font-medium">
                    Ngày giờ chiếu
                  </span>
                }
                rules={[
                  { required: true, message: "Vui lòng chọn ngày giờ chiếu" },
                ]}
              >
                <DatePicker
                  showTime
                  format="DD/MM/YYYY HH:mm"
                  className="w-full h-10"
                />
              </Form.Item>

              <Form.Item
                name="giaVe"
                label={
                  <span className="text-gray-700 font-medium">Giá vé</span>
                }
                rules={[
                  { required: true, message: "Vui lòng nhập giá vé" },
                  {
                    type: "number",
                    min: 75000,
                    message: "Giá vé tối thiểu là 75.000 VNĐ",
                  },
                  {
                    type: "number",
                    max: 200000,
                    message: "Giá vé tối đa là 200.000 VNĐ",
                  },
                ]}
                help={
                  <span className="text-gray-500">
                    Giá vé từ 75.000 - 200.000 VNĐ
                  </span>
                }
              >
                <InputNumber
                  addonAfter="VNĐ"
                  min={75000}
                  max={200000}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  className="w-full h-10"
                />
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default FilmScheduleModal;
