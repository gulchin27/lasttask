import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import tasksReducer from "./tasksSlice";
import uiReducer from "./uiSlice";

const rootReducer = combineReducers({
  tasks: tasksReducer,
  ui: uiReducer,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["ui"], 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
