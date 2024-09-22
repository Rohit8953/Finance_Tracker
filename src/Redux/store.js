import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from './userSlice'
import {userActivityReducer} from "./userActivitySlice";

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}
const rootReducer = (state, action) => {
  if (action.type === 'user/logout') {
    storage.removeItem('persist:root');
    state = undefined;
  }

  return combineReducers({
    userdetails: userSlice,
    useractivity: userActivityReducer,
  })(state, action);
};


const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});