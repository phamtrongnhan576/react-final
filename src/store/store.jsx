import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import adminFilmReducer from "./admin/adminFilmSlice.js";
import adminUserReducer from "./admin/adminUserSlice.js";

export const store = configureStore({
  reducer: {
    user: userReducer,
    adminFilm: adminFilmReducer,
    adminUser: adminUserReducer,
  },
});

export default store;
