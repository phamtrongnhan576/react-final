import React from "react";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import AllRoute from "./routers/AllRoutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserHistory } from "history";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const queryClient = new QueryClient();
const history = createBrowserHistory();

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <HistoryRouter history={history}>
                <AllRoute />
            </HistoryRouter>
        </QueryClientProvider>
    );
};

export default App;
