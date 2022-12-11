import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import alertSlice from "./reducers/alert-slice";
import authSlice from "./reducers/auth-slice";
import adminSlice from "./reducers/admin-slice";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import scrapSlice from "./reducers/scrap-slice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
const rootReducer = combineReducers({
  auth: authSlice.reducer,
  alert: alertSlice.reducer,
  scrap: scrapSlice.reducer,
  admin: adminSlice.reducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
let persistor = persistStore(store);

export default store;
export { persistor };
