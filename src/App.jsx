import React from "react";
import { BrowserRouter } from "react-router-dom";
import AllRoute from "./routers/AllRoutes";
import { Provider } from "react-redux";
import store from "./store";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AllRoute />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
