import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import FirmService from "../../services/firmService.js";

export const fetchFilms = createAsyncThunk(
  "admin/fetchFilms",
  async ({ page = 1, itemsPerPage = 10 }, { rejectWithValue }) => {
    try {
      const data = await FirmService.getFilmsPaginated(page, itemsPerPage);
      return {
        items: data.items,
        pagination: {
          currentPage: page,
          itemsPerPage,
          totalItems: data.totalItems,
          totalPages: data.totalPages,
        },
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateFilm = createAsyncThunk(
  "admin/updateFilm",
  async (filmData, { rejectWithValue }) => {
    try {
      const updatedFilm = await FirmService.updateFilm(filmData);
      return updatedFilm;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteFilm = createAsyncThunk(
  "admin/deleteFilm",
  async (filmId, { rejectWithValue }) => {
    try {
      await FirmService.deleteFilm(filmId);
      return filmId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addFilm = createAsyncThunk(
  "admin/addFilm",
  async (filmData, { rejectWithValue }) => {
    try {
      const newFilm = await FirmService.addFilm(filmData);
      return newFilm;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    films: [],
    loading: false,
    error: null,
    pagination: {
      currentPage: 1,
      itemsPerPage: 10,
      totalItems: 0,
      totalPages: 0,
    },
  },
  reducers: {
    setPagination: (state, action) => {
      state.pagination = {
        ...state.pagination,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFilms.fulfilled, (state, action) => {
        state.loading = false;
        state.films = action.payload.items;
        state.pagination = {
          ...state.pagination,
          ...action.payload.pagination,
        };
      })
      .addCase(fetchFilms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(updateFilm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateFilm.fulfilled, (state, action) => {
        state.loading = false;
        // Cập nhật film trong danh sách
        const index = state.films.findIndex(
          (film) => film.maPhim === action.payload.maPhim
        );
        if (index !== -1) {
          state.films[index] = action.payload;
        }
      })
      .addCase(updateFilm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteFilm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFilm.fulfilled, (state, action) => {
        state.loading = false;
        // Xóa film khỏi danh sách
        state.films = state.films.filter(
          (film) => film.maPhim !== action.payload
        );
        // Giảm totalItems đi 1
        state.pagination.totalItems -= 1;
        state.pagination.totalPages = Math.ceil(
          state.pagination.totalItems / state.pagination.itemsPerPage
        );
      })
      .addCase(deleteFilm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addFilm.fulfilled, (state, action) => {
        state.films.unshift(action.payload);
      });
  },
});

export const { setPagination } = adminSlice.actions;
export default adminSlice.reducer;
