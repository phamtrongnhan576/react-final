import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import UserFormModal from "../../components/admin/model/UserFormModal";
import DeleteUserModal from "../../components/admin/model/DeleteUserModal";
import { useUserManagement } from "../../hooks/useUserManagement";
import LoadingSpinner from "../../components/admin/shared/LoadingSpinner";
import ErrorResult from "../../components/admin/shared/ErrorResult";
import UserTable from "../../components/admin/table/UserTable";

const AdminUsersPage = () => {
  const {
    users,
    loading,
    error,
    pagination,
    form,
    isModalVisible,
    isDeleteModalVisible,
    setIsDeleteModalVisible,
    currentUser,
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
  } = useUserManagement();

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorResult error={error} />;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">User Management</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
          Thêm người dùng mới
        </Button>
      </div>

      <UserTable
        users={users}
        pagination={pagination}
        loading={loading}
        onPageChange={handlePageChange}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <UserFormModal
        visible={isModalVisible}
        onCancel={handleModalCancel}
        onSubmit={handleModalSubmit}
        form={form}
        currentUser={currentUser}
        fileList={fileList}
        setFileList={setFileList}
        beforeUpload={beforeUpload}
      />

      <DeleteUserModal
        visible={isDeleteModalVisible}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setIsDeleteModalVisible(false)}
        currentUser={currentUser}
      />
    </div>
  );
};

export default AdminUsersPage;
