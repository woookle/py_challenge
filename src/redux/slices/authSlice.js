import { createSlice } from "@reduxjs/toolkit";
import {
  registerUser,
  loginUser,
  fetchProfile,
  successTask,
  logoutFromAcc,
  avatar,
} from "../../api/userAPI";

const initialState = {
  user: null,
  loading: false,
  isUpdate: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
      })
      
      .addCase(avatar.pending, (state) => {
        state.isUpdate = true;
      })
      .addCase(avatar.fulfilled, (state, action) => {
        state.user.avatar = action.payload;
        state.isUpdate = false;
      })
      .addCase(avatar.rejected, (state, action) => {
        state.isUpdate = false;
      })

      .addCase(successTask.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(logoutFromAcc.fulfilled, (state, action) => {
        state.user = null;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
