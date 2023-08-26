import { configureStore, combineReducers } from "@reduxjs/toolkit";
import PostReducer from "./reducers/posts/PostsSlice";
import { postAPI } from "../services/PostsService";

const rootReducer = combineReducers({
  PostReducer,
  [postAPI.reducerPath]: postAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(postAPI.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
