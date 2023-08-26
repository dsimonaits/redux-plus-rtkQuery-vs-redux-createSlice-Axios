import axios from "axios";
import { IPost } from "../../../models/IPosts";

import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (limit: number, thunkAPI) => {
    try {
      const response = await axios.get<IPost[]>(
        `http://localhost:3000/posts?_limit=${limit}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("No posts found");
    }
  }
);

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (newPost: IPost, thunkAPI) => {
    try {
      const response = await axios.post<IPost>(
        "http://localhost:3000/posts",
        newPost
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("No posts added");
    }
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (post: IPost, thunkAPI) => {
    try {
      const { data } = await axios.put<IPost>(
        `http://localhost:3000/posts/${post.id}`,
        post
      );
      return { ...post, ...data };
    } catch (error) {
      return thunkAPI.rejectWithValue("No posts updated");
    }
  }
);
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (post: IPost, thunkAPI) => {
    try {
      const { data } = await axios.delete<IPost>(
        `http://localhost:3000/posts/${post.id}`
      );
      return { id: post.id, data };
    } catch (error) {
      return thunkAPI.rejectWithValue("No posts deleted");
    }
  }
);
export const changePostPerPage = createAsyncThunk(
  "posts/changePostPerPage",
  async (limit: number, thunkAPI) => {
    try {
      return limit;
    } catch (error) {
      return thunkAPI.rejectWithValue("No posts deleted");
    }
  }
);
