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
    totalJobsCount: 0,
    currentPage: 1,
  },
  reducers: {
    request(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    successForAllJobs(state, action) {
      state.loading = false;
      state.jobs = action.payload.jobs;
      state.totalJobsCount = action.payload.totalCount;
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
      return {
        jobs: [],
        loading: false,
        error: null,
        message: null,
        singleJob: {},
        myJobs: [],
        totalJobsCount: 0,
        currentPage: 1,
      };
    },
    setPage(state, action) {
      state.currentPage = action.payload;
    },
  },
});

export const fetchJobs = (state, city, skill, searchKeyword = "", page = 1) => async (dispatch) => {
  try {
    dispatch(jobSlice.actions.request());  // Indicate that the request is in progress

    // Build query parameters
    let queryParams = new URLSearchParams();

    if (searchKeyword) queryParams.append("searchKeyword", searchKeyword);
    if (state && state !== "All") queryParams.append("state", state);
    if (city && city !== "All") queryParams.append("city", city);
    if (skill && skill !== "All") queryParams.append("skill", skill);
    queryParams.append("page", page);

    const link = `${import.meta.env.VITE_API_BASE_URL}/api/v1/job/getall?${queryParams.toString()}`;

    console.log("API Request URL:", link);

    // Make API request
    const response = await axios.get(link, { withCredentials: true });

    // Dispatch the success action with job data and total count
    dispatch(jobSlice.actions.successForAllJobs({
      jobs: response.data.jobs,
      totalCount: response.data.totalCount,
    }));

    dispatch(jobSlice.actions.clearAllErrors());  // Clear errors if request is successful

  } catch (error) {
    // Handle errors gracefully
    const errorMessage = error?.response?.data?.message || "Failed to fetch jobs";
    console.error("Error fetching jobs:", errorMessage);
    dispatch(jobSlice.actions.failure(errorMessage));  // Dispatch error action
  }
};

export const fetchSingleJob = (jobId) => async (dispatch) => {
  dispatch(jobSlice.actions.request());
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/job/get/${jobId}`, { withCredentials: true });
    dispatch(jobSlice.actions.successForSingleJob(response.data.job));
    dispatch(jobSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(jobSlice.actions.failure(error.response?.data?.message || "Failed to fetch job"));
  }
};

export const setPage = (page) => (dispatch) => {
  dispatch(jobSlice.actions.setPage(page));
};

export const postJob = (data) => async (dispatch) => {
  dispatch(jobSlice.actions.request());
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/job/post`, data, {
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
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/job/getmyjobs`, { withCredentials: true });
    dispatch(jobSlice.actions.successForMyJobs(response.data.myJobs));
    dispatch(jobSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(jobSlice.actions.failure(error.response?.data?.message || "Failed to fetch jobs"));
  }
};

export const deleteJob = (id) => async (dispatch) => {
  dispatch(jobSlice.actions.request());
  try {
    const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/v1/job/delete/${id}`, { withCredentials: true });
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
