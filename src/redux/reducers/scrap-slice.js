import { createSlice } from "@reduxjs/toolkit";
import {
  deleteScrap,
  getScraps,
  getScrapsByUserIdApi,
  addScrapApi,
} from "../../services/scrapService";
import { alertActions } from "./alert-slice";
import { authActions } from "./auth-slice";

const scrapSlice = createSlice({
  name: "scrap",
  initialState: {
    allScrapsList: [],
    scrapsListByUserId: [],
  },
  reducers: {
    getAllScraps(state, action) {
      console.log(action.payload);
      state.allScrapsList = action.payload;
    },
    getScrapsByUserId(state, action) {
      state.scrapsListByUserId = action.payload;
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

      dispatch(scrapActions.getAllScraps(res.data.data));
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

export const getScrapsListByUserID = (token, userId) => async (dispatch) => {
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

      dispatch(scrapActions.getScrapsByUserId(res.data.data));
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
      dispatch(scrapActions.getScrapsByUserId(res.data.scraps));
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
      dispatch(scrapActions.getScrapsByUserId(res.data.scraps));
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
