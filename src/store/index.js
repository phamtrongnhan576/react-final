import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./admin/index.js";

const store = configureStore({
  reducer: {
    ...adminReducer,
  },
});

export default store;
