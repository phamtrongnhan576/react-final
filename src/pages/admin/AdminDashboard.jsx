import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFilms } from "../../store/admin/adminSlice.js";
import TableComponent from "../../components/admin/TableComponent.jsx";

const AdminDashBoardPage = () => {
  const dispatch = useDispatch();
  const { films, loading, error } = useSelector((state) => state.admin);

  console.log(films);

  useEffect(() => {
    dispatch(fetchFilms());
  }, [dispatch]);

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>Lỗi: {error}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Film Management</h1>
      <TableComponent />
    </div>
  );
};

export default AdminDashBoardPage;
