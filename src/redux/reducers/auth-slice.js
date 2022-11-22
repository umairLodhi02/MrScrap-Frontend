import { createSlice } from "@reduxjs/toolkit";
import { alertActions } from "./alert-slice";
import { login } from "../../services/loginService";
import { register, updateProfile } from "../../services/registerService";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    session: {
      userId: "",
      username: "",
      email: "",
      password: "",
      contactNo: "",
      token: "",
      profileImgUrl: "",
      currentLocation: {
        latitude: null,
        longitude: null,
      },
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

    clearSession: (state) => {
      state.session = {
        userId: "",
        username: "",
        email: "",
        password: "",
        contactNo: "",
        token: "",
        profileImgUrl: "",
        currentLocation: {
          latitude: null,
          longitude: null,
        },
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
export default authSlice;
