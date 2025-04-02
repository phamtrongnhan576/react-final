// ../template/admin/LayoutAdmin.jsx
import { Outlet } from "react-router-dom";

const LayoutAdmin = () => {
  return (
    <div>
      <header>Admin Header</header>
      <main>
        <Outlet />
      </main>
      <footer>Admin Footer</footer>
    </div>
  );
};

export default LayoutAdmin;
