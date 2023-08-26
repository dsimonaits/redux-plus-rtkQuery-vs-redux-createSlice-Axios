import { PayloadAction, createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  changePostPerPage,
  createPost,
  deletePost,
  fetchPosts,
  updatePost,
} from "./PostsActions";
import { IPost } from "../../../models/IPosts";

const getErrorMessage = (payload: unknown): string => {
  if (typeof payload === "string") {
    return payload;
  }
  return "An error occurred";
};

interface UserState {
  posts: IPost[];
  isLoading: boolean;
  error: string;
  postsPerPage: number;
}

const initialState: UserState = {
  posts: [],
  isLoading: false,
  error: "",
  postsPerPage: 5,
};

export const userSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, { payload }) => {
        state.posts = payload || [];
      })
      .addCase(createPost.fulfilled, (state, { payload }) => {
        state.posts = [...state.posts, payload];
      })
      .addCase(deletePost.fulfilled, (state, { payload }) => {
        state.posts = state.posts.filter((post) => post.id !== payload.id);
      })
      .addCase(updatePost.fulfilled, (state, { payload }) => {
        state.posts = state.posts.map((post) =>
          post.id === payload.id ? payload : post
        );
      })
      .addCase(changePostPerPage.fulfilled, (state, { payload }) => {
        state.postsPerPage = payload;
      })
      .addMatcher(
        isAnyOf(fetchPosts.pending, createPost.pending, deletePost.pending),
        (state) => {
          state.isLoading = true;
          state.error = "";
        }
      )
      .addMatcher(
        isAnyOf(
          fetchPosts.fulfilled,
          createPost.fulfilled,
          deletePost.fulfilled
        ),
        (state) => {
          state.isLoading = false;
          state.error = "";
        }
      )
      .addMatcher(
        isAnyOf(fetchPosts.rejected, createPost.rejected, deletePost.rejected),
        (state, { payload }) => {
          state.isLoading = false;
          state.error = getErrorMessage(payload);
        }
      );
  },
});

export default userSlice.reducer;
