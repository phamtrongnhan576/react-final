import LayoutDefault from "../template/LayoutDefault.jsx";
import Home from "../pages/Home";
import SeatSelection from "../pages/SeatSelection";
import Detail from "../pages/Detail";
import Error404 from "../pages/Error404";

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
                path: "/SeatSelection",
                element: <SeatSelection />,
            },
            {
                path: "/Detail",
                element: <Detail />,
            },
        ],
    },
];
