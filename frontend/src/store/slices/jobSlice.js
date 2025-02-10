import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const jobSlice = createSlice({
  name: "jobs",
  initialState: {
    jobs: [],
    loading: false,
    error: null,
    message: null,
    singleJob: {},
    myJobs: [],
  },
  reducers: {
    request(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    successForAllJobs(state, action) {
      state.loading = false;
      state.jobs = action.payload;
    },
    failure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    successForSingleJob(state, action) {
      state.loading = false;
      state.singleJob = action.payload;
    },
    successForPostJob(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    successForMyJobs(state, action) {
      state.loading = false;
      state.myJobs = action.payload;
    },
    successForDeleteJob(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    clearAllErrors(state) {
      state.error = null;
    },
    resetJobSlice(state) {
      state.loading = false;
      state.error = null;
      state.message = null;
      state.myJobs = [];
      state.singleJob = {};
    },
  },
});

export const fetchJobs = (city, skill, searchKeyword = "") => async (dispatch) => {
  try {
    dispatch(jobSlice.actions.request());
    let queryParams = new URLSearchParams();
    
    if (searchKeyword) queryParams.append("searchKeyword", searchKeyword);
    if (city && city !== "All") queryParams.append("city", city);
    if (skill && skill !== "All") queryParams.append("skill", skill);
    
    const link = `https://job-portal-backend-sifx.onrender.com/api/v1/job/getall?${queryParams.toString()}`;
    const response = await axios.get(link, { withCredentials: true });
    
    dispatch(jobSlice.actions.successForAllJobs(response.data.jobs));
    dispatch(jobSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(jobSlice.actions.failure(error.response?.data?.message || "Failed to fetch jobs"));
  }
};

export const fetchSingleJob = (jobId) => async (dispatch) => {
  dispatch(jobSlice.actions.request());
  try {
    const response = await axios.get(`https://job-portal-backend-sifx.onrender.com/api/v1/job/get/${jobId}`, { withCredentials: true });
    dispatch(jobSlice.actions.successForSingleJob(response.data.job));
    dispatch(jobSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(jobSlice.actions.failure(error.response?.data?.message || "Failed to fetch job"));
  }
};

export const postJob = (data) => async (dispatch) => {
  dispatch(jobSlice.actions.request());
  try {
    const response = await axios.post(`https://job-portal-backend-sifx.onrender.com/api/v1/job/post`, data, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    dispatch(jobSlice.actions.successForPostJob(response.data.message));
    dispatch(jobSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(jobSlice.actions.failure(error.response?.data?.message || "Failed to post job"));
  }
};

export const getMyJobs = () => async (dispatch) => {
  dispatch(jobSlice.actions.request());
  try {
    const response = await axios.get(`https://job-portal-backend-sifx.onrender.com/api/v1/job/getmyjobs`, { withCredentials: true });
    dispatch(jobSlice.actions.successForMyJobs(response.data.myJobs));
    dispatch(jobSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(jobSlice.actions.failure(error.response?.data?.message || "Failed to fetch jobs"));
  }
};

export const deleteJob = (id) => async (dispatch) => {
  dispatch(jobSlice.actions.request());
  try {
    const response = await axios.delete(`https://job-portal-backend-sifx.onrender.com/api/v1/job/delete/${id}`, { withCredentials: true });
    dispatch(jobSlice.actions.successForDeleteJob(response.data.message));
    dispatch(jobSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(jobSlice.actions.failure(error.response?.data?.message || "Failed to delete job"));
  }
};

export const clearAllJobErrors = () => (dispatch) => {
  dispatch(jobSlice.actions.clearAllErrors());
};

export const resetJobSlice = () => (dispatch) => {
  dispatch(jobSlice.actions.resetJobSlice());
};

export default jobSlice.reducer;
