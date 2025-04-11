import LayoutDefault from "../template/LayoutDefault.jsx";
import LayoutAdmin from "../template/admin/layout.jsx";
import Home from "../pages/Home";
import SeatSelection from "../pages/SeatSelection";
import Detail from "../pages/Detail";
import Error404 from "../pages/Error404";
import AdminDashBoardPage from "../pages/admin/AdminDashboardPage.jsx";
import AdminUsersPage from "../pages/admin/AdminUsersPage.jsx";
import LoginPage from "../pages/auth/pages/Login.jsx";
import RegisterPage from "../pages/auth/pages/Register.jsx";
import LayoutAuth from "../pages/auth/layout.jsx";

export const routes = [
  {
    //Tuyến đường cho user
    path: "/",
    element: <LayoutDefault />,
    children: [
      {
        path: "*",
        element: <Error404 />,
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/SeatSelection",
        element: <SeatSelection />,
      },
      {
        path: "/Detail",
        element: <Detail />,
      },
    ],
  },
  {
    //Tuyến đường cho admin
    path: "/admin",
    element: <LayoutAdmin />,
    children: [
      { index: true, element: <AdminDashBoardPage /> },
      { path: "film", element: <AdminDashBoardPage /> },
      { path: "user", element: <AdminUsersPage /> },
      { path: "*", element: <Error404 /> },
    ],
  },
  //Tuyến đường cho auth
  {
    path: "/auth",
    element: <LayoutAuth />,
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
    ],
  },
  // 404 toàn cục
  { path: "*", element: <Error404 /> },
];
