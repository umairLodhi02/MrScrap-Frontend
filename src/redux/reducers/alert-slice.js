import { createSlice } from "@reduxjs/toolkit";

const alertSlice = createSlice({
  name: "alert",
  initialState: { notification: null, loading: false },
  reducers: {
    showNotification(state, action) {
      if (!action.payload) {
        state.notification = null;
      } else {
        state.notification = {
          message: action.payload.message,
          type: action.payload.type,
          open: action.payload.open,
        };
      }
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const alertActions = alertSlice.actions;

export default alertSlice;
