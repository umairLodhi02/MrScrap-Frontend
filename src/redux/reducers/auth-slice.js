import { createSlice } from "@reduxjs/toolkit";
import { alertActions } from "./alert-slice";
import { login } from "../../services/loginService";
import { register, updateProfile } from "../../services/registerService";
import { GiveFeedBackApi } from "../../services/feedbackService";
import {
  fetchComplainsByUserIdApi,
  GiveComplainApi,
  deleteComplainUserApi,
} from "../../services/complainService";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    userComplainsList: [],
    session: {
      userId: "",
      username: "",
      email: "",
      password: "",
      contactNo: "",
      token: "",
      profileImgUrl: "",
      address: "",
    },
  },
  reducers: {
    setSession: (state, action) => {
      console.log("Set Session calls", action.payload);
      state.session = {
        ...state.session,
        ...action.payload,
      };
    },
    setUserComplainsList: (state, action) => {
      state.userComplainsList = action.payload;
    },
    clearSession: (state) => {
      state.session = {
        userId: "",
        username: "",
        email: "",
        password: "",
        contactNo: "",
        token: "",
        profileImgUrl: "",
        address: "",
      };
    },

    logout: () => {
      console.log("logging out");
      //   dispatch(alertActions.setLoading());
      // localStorage.removeItem("token");
      // localStorage.removeItem("persist:root");

      localStorage.clear();
      window.location.href = "/";

      //   dispatch(alertActions.clearSession());
      //   dispatch(alertActions.setLoading());
    },
  },
});
export const authActions = authSlice.actions;

export const loginUser = (req) => async (dispatch) => {
  try {
    dispatch(alertActions.setLoading(true));
    const res = await login(req);
    if (res && res.success) {
      dispatch(
        alertActions.showNotification({
          message: `${res.message}`,
          type: "normal",
          open: true,
        })
      );

      dispatch(
        authActions.setSession({
          userId: res.data.metadata.ID,
          token: res.data.accessToken,
          username: res.data.metadata.username,
          email: res.data.metadata.email,
          contactNo: res.data.metadata.contactNo,
          profileImgUrl: res.data.metadata.profileImgUrl,
        })
      );

      localStorage.setItem("token", res.data.accessToken);
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
    console.log(err);
    dispatch(
      alertActions.showNotification({
        message: `Something went wrong!`,
        type: "warning",
        open: true,
      })
    );
    setTimeout(() => {
      dispatch(alertActions.showNotification(null));
    }, 3000);
    dispatch(alertActions.setLoading(false));
  }
};

export const registerUser = (req) => async (dispatch) => {
  try {
    dispatch(alertActions.setLoading(true));

    const res = await register(req);

    if (res && res.success) {
      dispatch(
        alertActions.showNotification({
          message: `${res.message}`,
          type: "normal",
          open: true,
        })
      );

      window.location.href = "/";
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
    console.log(err);
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

export const updateUser = (req, token, userId) => async (dispatch) => {
  try {
    dispatch(alertActions.setLoading(true));
    const res = await updateProfile(req, token, userId);
    if (res && res.success) {
      dispatch(
        alertActions.showNotification({
          message: `${res.message}`,
          type: "normal",
          open: true,
        })
      );
      dispatch(
        authActions.setSession({
          userId: res.data.metadata.ID,
          username: res.data.metadata.username,
          email: res.data.metadata.email,
          contactNo: res.data.metadata.contactNo,
          profileImgUrl: res.data.metadata.profileImgUrl,
        })
      );
      setTimeout(() => {
        dispatch(alertActions.showNotification(null));
      }, 3000);
      dispatch(alertActions.setLoading(false));
      return 200;
    } else if (res && res.message === "Invalid Token") {
      dispatch(authActions.logout());
      setTimeout(() => {
        dispatch(alertActions.showNotification(null));
      }, 3000);
      dispatch(alertActions.setLoading(false));
      return 500;
    } else {
      dispatch(
        alertActions.showNotification({
          message: `${res.message}`,
          type: "warning",
          open: true,
        })
      );
      setTimeout(() => {
        dispatch(alertActions.showNotification(null));
      }, 3000);
      dispatch(alertActions.setLoading(false));
      return 400;
    }
  } catch (err) {
    console.log(err);
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

export const giveFeedBack = (req, token) => async (dispatch) => {
  dispatch(alertActions.setLoading(true));

  try {
    const res = await GiveFeedBackApi(req, token);
    if (res && res.success) {
      dispatch(
        alertActions.showNotification({
          message: `${res.message}`,
          type: "normal",
          open: true,
        })
      );
    } else if (res && res.message === "Invalid Token") {
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
    console.log(err);
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

export const giveComplain = (req, token) => async (dispatch) => {
  dispatch(alertActions.setLoading(true));

  try {
    const res = await GiveComplainApi(req, token);
    if (res && res.success) {
      dispatch(
        alertActions.showNotification({
          message: `${res.message}`,
          type: "normal",
          open: true,
        })
      );
      dispatch(authActions.setUserComplainsList(res.data.complains));
    } else if (res && res.message === "Invalid Token") {
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
    console.log(err);
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

export const fetchComplainsUser = (token) => async (dispatch) => {
  try {
    dispatch(alertActions.setLoading(true));

    const res = await fetchComplainsByUserIdApi(token);

    if (res && res.success) {
      dispatch(
        alertActions.showNotification({
          message: `${res.message}`,
          open: true,
          type: "normal",
        })
      );
      dispatch(authActions.setUserComplainsList(res.data.complains));
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
    console.log(err);
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

export const deleteComplainUser = (token, complainId) => async (dispatch) => {
  try {
    dispatch(alertActions.setLoading(true));
    const res = await deleteComplainUserApi(token, complainId);
    if (res && res.success) {
      dispatch(
        alertActions.showNotification({
          message: `${res.message}`,
          open: true,
          type: "normal",
        })
      );
      console.log(res.data.scraps);
      dispatch(authActions.setUserComplainsList(res.data.complains));
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
    console.log(err);
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
export default authSlice;
