import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import UserService from "../../services/userService.js";

export const searchUsers = createAsyncThunk(
  "adminUser/searchUsers",
  async (
    { keyword, currentPage = 1, itemsPerPage = 10 },
    { rejectWithValue }
  ) => {
    try {
      const data = await UserService.searchUsersPaginated(
        keyword,
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
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUsers = createAsyncThunk(
  "adminUser/fetchUsers",
  async ({ currentPage = 1, itemsPerPage = 10 }, { rejectWithValue }) => {
    try {
      const data = await UserService.getUsersPaginated(
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
      return rejectWithValue(error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "adminUser/updateUser",
  async (userData, { rejectWithValue }) => {
    try {
      const updatedUser = await UserService.updateUser(userData);
      return updatedUser;
    } catch (error) {
      console.log("error updateUser: ", error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "adminUser/deleteUser",
  async (taiKhoan, { rejectWithValue }) => {
    try {
      const deletedUser = await UserService.deleteUser(taiKhoan);
      return deletedUser;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addUser = createAsyncThunk(
  "adminUser/addUser",
  async (userData, { rejectWithValue }) => {
    try {
      const newUser = await UserService.addUser(userData);
      return newUser;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const adminUserSlice = createSlice({
  name: "adminUser",
  initialState: {
    users: [],
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
      .addCase(searchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.items;
        state.pagination = {
          ...state.pagination,
          ...action.payload.pagination,
        };
      })
      .addCase(searchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.items;
        state.pagination = {
          ...state.pagination,
          ...action.payload.pagination,
        };
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.users.findIndex(
          (user) => user.maPhim === action.payload.content.maPhim
        );
        if (index !== -1) {
          state.users[index] = action.payload.content;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;

        state.users = state.users.filter(
          (user) => user.maPhim !== action.payload.content.maPhim
        );

        state.pagination.totalCount -= 1;
        state.pagination.totalPages = Math.ceil(
          state.pagination.totalCount / state.pagination.itemsPerPage
        );
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(addUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.unshift(action.payload.content);
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { setPagination } = adminUserSlice.actions;
export default adminUserSlice.reducer;
