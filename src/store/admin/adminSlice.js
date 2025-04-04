import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import FirmService from "../../services/firmService.js";

export const fetchFilms = createAsyncThunk("admin/fetchFilms", async () => {
  const response = await FirmService.getFirmData();
  return response;
});

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    films: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFilms.fulfilled, (state, action) => {
        state.loading = false;
        state.films = action.payload;
      })
      .addCase(fetchFilms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default adminSlice.reducer;
