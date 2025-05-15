import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    isAuthenticated: false,
    user: {},
    error: null,
    message: null,
  },
  reducers: {
    request(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    success(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.message = action.payload.message;
    },
    failure(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
    },
    fetchUserSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logoutSuccess(state) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
      state.message = null;
    },
    clearErrors(state) {
      state.error = null;
    },
  },
});

export const register = (data) => async (dispatch) => {
  dispatch(userSlice.actions.request());
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/user/register`,
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(userSlice.actions.success(response.data));
    dispatch(userSlice.actions.clearErrors());
  } catch (error) {
    dispatch(
      userSlice.actions.failure(error.response?.data?.message || "An error occurred")
    );
  }
};

export const login = (data) => async (dispatch) => {
  dispatch(userSlice.actions.request());
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/user/login`,
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(userSlice.actions.success(response.data));
    dispatch(userSlice.actions.clearErrors());
  } catch (error) {
    dispatch(
      userSlice.actions.failure(error.response?.data?.message || "An error occurred")
    );
  }
};

export const getUser = () => async (dispatch) => {
  dispatch(userSlice.actions.request());
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/user/getuser`, {
      withCredentials: true,
    });
    dispatch(userSlice.actions.fetchUserSuccess(response.data.user));
    dispatch(userSlice.actions.clearErrors());
  } catch (error) {
    dispatch(
      userSlice.actions.failure(error.response?.data?.message || "An error occurred")
    );
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/user/logout`, {
      withCredentials: true,
    });
    dispatch(userSlice.actions.logoutSuccess());
    dispatch(userSlice.actions.clearErrors());
  } catch (error) {
    dispatch(
      userSlice.actions.failure(error.response?.data?.message || "An error occurred")
    );
  }
};

export const clearAllUserErrors = () => (dispatch) => {
  dispatch(userSlice.actions.clearErrors());
};

export default userSlice.reducer;
