import LayoutDefault from "../template/LayoutDefault.jsx";
import Home from "../pages/Home";
import SeatSelection from "../pages/SeatSelection";
import Detail from "../pages/Detail";
import Error404 from "../pages/Error404";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
export const routes = [
    {
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
                path: "/SeatSelection/:maLichChieu",
                element: <SeatSelection />,
            },
            {
                path: "/Detail/:maPhim",
                element: <Detail />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <SignUp />,
            },
        ],
    },
];
