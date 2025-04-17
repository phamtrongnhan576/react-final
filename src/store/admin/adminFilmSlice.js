import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import FirmService from "../../services/firmService.js";

export const createShowSchedule = createAsyncThunk(
  "admin/createShowSchedule",
  async (scheduleData, { rejectWithValue }) => {
    try {
      const data = await FirmService.createShowSchedule(scheduleData);

      return {
        items: data.items,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Lỗi không xác định"
      );
    }
  }
);

export const fetchCinemaClusters = createAsyncThunk(
  "admin/fetchCinemaClusters",
  async (cinemaSystemId, { rejectWithValue }) => {
    try {
      const data = await FirmService.getCinemaClusters(cinemaSystemId);

      return {
        items: data.items,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Lỗi không xác định"
      );
    }
  }
);

export const fetchCinemaSystems = createAsyncThunk(
  "admin/fetchCinemaSystems",
  async (_, { rejectWithValue }) => {
    try {
      const data = await FirmService.getCinemaSystems();
      return {
        items: data.items,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Lỗi không xác định"
      );
    }
  }
);

export const fetchFilms = createAsyncThunk(
  "admin/fetchFilms",
  async ({ currentPage = 1, itemsPerPage = 10 }, { rejectWithValue }) => {
    try {
      const data = await FirmService.getFilmsPaginated(
        currentPage,
        itemsPerPage
      );
      return {
        items: data.items,
        pagination: {
          currentPage,
          itemsPerPage,
          totalCount: data.totalCount,
          totalPages: data.totalPages,
        },
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Lỗi không xác định"
      );
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
      return rejectWithValue(
        error.response?.data?.message || error.message || "Lỗi không xác định"
      );
    }
  }
);

export const deleteFilm = createAsyncThunk(
  "admin/deleteFilm",
  async (filmId, { rejectWithValue }) => {
    try {
      const deletedFilm = await FirmService.deleteFilm(filmId);
      return deletedFilm;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Lỗi không xác định"
      );
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
      return rejectWithValue(
        error.response?.data?.message || error.message || "Lỗi không xác định"
      );
    }
  }
);

const adminFilmSlice = createSlice({
  name: "admin",
  initialState: {
    films: [],
    cinemaSystems: [],
    cinemaClusters: [],
    schedule: null,
    loading: false,
    error: null,
    pagination: {
      currentPage: 1,
      itemsPerPage: 10,
      totalCount: 0,
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
      .addCase(createShowSchedule.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createShowSchedule.fulfilled, (state, action) => {
        state.loading = false;
        state.schedule = action.payload.items;
      })
      .addCase(createShowSchedule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchCinemaClusters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCinemaClusters.fulfilled, (state, action) => {
        state.loading = false;
        state.cinemaClusters = action.payload.items;
      })
      .addCase(fetchCinemaClusters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchCinemaSystems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCinemaSystems.fulfilled, (state, action) => {
        state.loading = false;
        state.cinemaSystems = action.payload.items;
      })
      .addCase(fetchCinemaSystems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
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
        const index = state.films.findIndex(
          (film) => film.maPhim === action.payload.content.maPhim
        );
        if (index !== -1) {
          state.films[index] = action.payload.content;
        }
      })
      .addCase(updateFilm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(deleteFilm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFilm.fulfilled, (state, action) => {
        state.loading = false;

        state.films = state.films.filter(
          (film) => film.maPhim !== action.payload.content.maPhim
        );

        state.pagination.totalCount -= 1;
        state.pagination.totalPages = Math.ceil(
          state.pagination.totalCount / state.pagination.itemsPerPage
        );
      })
      .addCase(deleteFilm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(addFilm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addFilm.fulfilled, (state, action) => {
        state.loading = false;
        state.films.unshift(action.payload.content);
      })
      .addCase(addFilm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { setPagination } = adminFilmSlice.actions;
export default adminFilmSlice.reducer;
