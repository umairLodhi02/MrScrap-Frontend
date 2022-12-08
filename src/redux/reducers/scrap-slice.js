import { createSlice } from "@reduxjs/toolkit";
import {
  deleteScrap,
  getScraps,
  getScrapsByUserIdApi,
  addScrapApi,
  updateScrapApi,
} from "../../services/scrapService";
import { alertActions } from "./alert-slice";
import { authActions } from "./auth-slice";

const scrapSlice = createSlice({
  name: "scrap",
  initialState: {
    allScrapsList: [],
    userScrapsList: [],
  },
  reducers: {
    setAllScrapsList(state, action) {
      console.log(action.payload);
      state.allScrapsList = action.payload;
    },
    setUserScrapsList(state, action) {
      state.userScrapsList = action.payload;
    },
  },
});

export const scrapActions = scrapSlice.actions;

export default scrapSlice;

export const getAllScrapsList = (token) => async (dispatch) => {
  try {
    dispatch(alertActions.setLoading(true));

    const res = await getScraps(token);
    if (res && res.success) {
      dispatch(
        alertActions.showNotification({
          message: `${res.message}`,
          open: true,
          type: "normal",
        })
      );

      dispatch(scrapActions.setAllScrapsList(res.data.data));
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

export const getUserScrapsList = (token, userId) => async (dispatch) => {
  try {
    dispatch(alertActions.setLoading(true));

    const res = await getScrapsByUserIdApi(token, userId);
    if (res && res.success) {
      dispatch(
        alertActions.showNotification({
          message: `${res.message}`,
          open: true,
          type: "normal",
        })
      );

      dispatch(scrapActions.setUserScrapsList(res.data.data));
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
    dispatch(alertActions.setLoading(false));
    setTimeout(() => {
      dispatch(alertActions.showNotification(null));
    }, 3000);
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

export const deleteScrapByUser = (token, scrapId) => async (dispatch) => {
  try {
    dispatch(alertActions.setLoading(true));
    const res = await deleteScrap(token, scrapId);
    if (res && res.success) {
      dispatch(
        alertActions.showNotification({
          message: `${res.message}`,
          open: true,
          type: "normal",
        })
      );
      console.log(res.data.scraps);
      dispatch(scrapActions.setUserScrapsList(res.data.scraps));
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

export const addScrap = (req, token, userId) => async (dispatch) => {
  try {
    dispatch(alertActions.setLoading(true));

    const res = await addScrapApi(req, token, userId);
    if (res && res.success) {
      dispatch(
        alertActions.showNotification({
          message: `${res.message}`,
          open: true,
          type: "normal",
        })
      );
      console.log(res.data.scraps);
      dispatch(scrapActions.setUserScrapsList(res.data.scraps));
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

export const updateScrap =
  (req, token, scrapId, scrapList) => async (dispatch) => {
    try {
      dispatch(alertActions.setLoading(true));

      const res = await updateScrapApi(req, token, scrapId);

      if (res && res.success) {
        dispatch(
          alertActions.showNotification({
            type: "normal",
            message: `${res.message}`,
            open: true,
          })
        );

        window.location.reload(false);
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
