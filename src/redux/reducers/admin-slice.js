import { createSlice } from "@reduxjs/toolkit";
import {
  getComplainsApi,
  getFeedbacksApi,
  getUsersApi,
} from "../../services/adminServices";
import { alertActions } from "./alert-slice";
import { authActions } from "./auth-slice";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    usersList: [],
    complainsList: [],
    feedbacksList: [],
  },
  reducers: {
    setUsersList: (state, action) => {
      state.usersList = action.payload;
    },
    setComplainsList: (state, action) => {
      state.complainsList = action.payload;
    },
    setFeedbacksList: (state, action) => {
      state.feedbacksList = action.payload;
    },
  },
});

export const adminActions = adminSlice.actions;
export default adminSlice;
export const getUsersList = (token) => async (dispatch) => {
  try {
    dispatch(alertActions.setLoading(true));
    const res = await getUsersApi(token);

    if (res && res.success) {
      dispatch(
        alertActions.showNotification({
          message: `${res.message}`,
          open: true,
          type: "normal",
        })
      );
      console.log(res.data.users);
      dispatch(adminActions.setUsersList(res.data.users));
    } else if (res && res.code == 401) {
      dispatch(
        alertActions.showNotification({
          message: `UnAuthorized`,
          open: true,
          type: "warning",
        })
      );
      dispatch(authActions.logout());
    } else {
      dispatch(
        alertActions.showNotification({
          message: `${res.message}`,
          type: "warning",
          open: true,
        })
      );
    }
    setTimeout(() => {
      dispatch(alertActions.showNotification(null));
    }, 3000);
    dispatch(alertActions.setLoading(false));
  } catch (err) {
    dispatch(
      alertActions.showNotification({
        message: `Something went wrong!`,
        type: "warning",
        open: true,
      })
    );
    dispatch(alertActions.setLoading(false));
  }
};

export const getComplainsList = (token) => async (dispatch) => {
  try {
    dispatch(alertActions.setLoading(true));
    const res = await getComplainsApi(token);

    if (res && res.success) {
      dispatch(
        alertActions.showNotification({
          message: `${res.message}`,
          open: true,
          type: "normal",
        })
      );
      console.log(res.data.users);
      dispatch(adminActions.setComplainsList(res.data.complains));
    } else if (res && res.code == 401) {
      dispatch(
        alertActions.showNotification({
          message: `UnAuthorized`,
          open: true,
          type: "warning",
        })
      );
      dispatch(authActions.logout());
    } else {
      dispatch(
        alertActions.showNotification({
          message: `${res.message}`,
          type: "warning",
          open: true,
        })
      );
    }
    setTimeout(() => {
      dispatch(alertActions.showNotification(null));
    }, 3000);
    dispatch(alertActions.setLoading(false));
  } catch (err) {
    dispatch(
      alertActions.showNotification({
        message: `Something went wrong!`,
        type: "warning",
        open: true,
      })
    );
    dispatch(alertActions.setLoading(false));
  }
};

export const getFeedbacksList = (token) => async (dispatch) => {
  try {
    dispatch(alertActions.setLoading(true));
    const res = await getFeedbacksApi(token);

    if (res && res.success) {
      dispatch(
        alertActions.showNotification({
          message: `${res.message}`,
          open: true,
          type: "normal",
        })
      );
      console.log(res.data.users);
      dispatch(adminActions.setFeedbacksList(res.data.feedbacks));
    } else if (res && res.code == 401) {
      dispatch(
        alertActions.showNotification({
          message: `UnAuthorized`,
          open: true,
          type: "warning",
        })
      );
      dispatch(authActions.logout());
    } else {
      dispatch(
        alertActions.showNotification({
          message: `${res.message}`,
          type: "warning",
          open: true,
        })
      );
    }
    setTimeout(() => {
      dispatch(alertActions.showNotification(null));
    }, 3000);
    dispatch(alertActions.setLoading(false));
  } catch (err) {
    dispatch(
      alertActions.showNotification({
        message: `Something went wrong!`,
        type: "warning",
        open: true,
      })
    );
    dispatch(alertActions.setLoading(false));
  }
};
