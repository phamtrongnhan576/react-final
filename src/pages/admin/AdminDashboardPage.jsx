import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import FilmTable from "../../components/admin/table/FilmTable";
import FilmFormModal from "../../components/admin/model/FilmFormModal";
import FilmScheduleModal from "../../components/admin/model/FilmScheduleModal";
import DeleteConfirmModal from "../../components/admin/model/DeleteConfirmModal";
import { useFilmManagement } from "../../hooks/useFilmManagement";
import LoadingSpinner from "../../components/admin/shared/LoadingSpinner";
import ErrorResult from "../../components/admin/shared/ErrorResult";

const AdminDashboardPage = () => {
  const {
    contextHolder,
    schedule,
    cinemaSystemId,
    cinemaClusters,
    cinemaSystems,
    films,
    loading,
    error,
    pagination,
    form,
    isModalVisible,
    isDeleteModalVisible,
    isScheduleModalVisible,
    currentFilm,
    currentSchedule,
    fileList,
    setIsDeleteModalVisible,
    setCurrentSchedule,
    setCinemaSystemId,
    setFileList,
    handlePageChange,
    handleEdit,
    handleDelete,
    handleDeleteConfirm,
    handleCreate,
    handleModalCancel,
    handleModalSubmit,
    handleModalSubmitSchedule,
    beforeUpload,
    handleCreateSchedule,
  } = useFilmManagement();

  return (
    <div className="p-4">
      {contextHolder}

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorResult error={error} />
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Film Management</h1>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleCreate}
            >
              Thêm phim mới
            </Button>
          </div>

          <FilmTable
            films={films}
            pagination={pagination}
            loading={loading}
            onPageChange={handlePageChange}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onCreateSchedule={handleCreateSchedule}
          />

          <FilmFormModal
            visible={isModalVisible}
            onCancel={handleModalCancel}
            onSubmit={handleModalSubmit}
            form={form}
            currentFilm={currentFilm}
            fileList={fileList}
            setFileList={setFileList}
            beforeUpload={beforeUpload}
          />

          <FilmScheduleModal
            visible={isScheduleModalVisible}
            onCancel={handleModalCancel}
            onSubmitSchedule={handleModalSubmitSchedule}
            form={form}
            currentSchedule={currentSchedule}
            currentFilm={currentFilm}
            cinemaSystems={cinemaSystems}
            setCurrentSchedule={setCurrentSchedule}
            setCinemaSystemId={setCinemaSystemId}
            cinemaClusters={cinemaClusters}
            cinemaSystemId={cinemaSystemId}
            contextHolder={contextHolder}
            schedule={schedule}
          />

          <DeleteConfirmModal
            visible={isDeleteModalVisible}
            onConfirm={handleDeleteConfirm}
            onCancel={() => setIsDeleteModalVisible(false)}
            currentFilm={currentFilm}
          />
        </>
      )}
    </div>
  );
};

export default AdminDashboardPage;
