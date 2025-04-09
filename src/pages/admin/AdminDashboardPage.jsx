import React from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import FilmTable from "../../components/admin/table/FilmTable";
import FilmFormModal from "../../components/admin/model/FilmFormModal";
import DeleteConfirmModal from "../../components/admin/model/DeleteConfirmModal";
import { useFilmManagement } from "../../hooks/useFilmManagement";
import LoadingSpinner from "../../components/admin/shared/LoadingSpinner";
import ErrorResult from "../../components/admin/shared/ErrorResult";

const AdminDashboardPage = () => {
  const {
    films,
    loading,
    error,
    pagination,
    form,
    isModalVisible,
    isDeleteModalVisible,
    setIsDeleteModalVisible,
    currentFilm,
    fileList,
    setFileList,
    handlePageChange,
    handleEdit,
    handleDelete,
    handleDeleteConfirm,
    handleCreate,
    handleModalCancel,
    handleModalSubmit,
    beforeUpload,
  } = useFilmManagement();

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorResult error={error} />;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Film Management</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
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

      <DeleteConfirmModal
        visible={isDeleteModalVisible}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setIsDeleteModalVisible(false)}
        currentFilm={currentFilm}
      />
    </div>
  );
};

export default AdminDashboardPage;
