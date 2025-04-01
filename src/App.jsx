import React from "react";
import { BrowserRouter } from "react-router-dom";
import AllRoute from "./routers/AllRoutes";

const App = () => {
    return (
        <BrowserRouter>
            <AllRoute />
        </BrowserRouter>
    );
};

export default App;
    