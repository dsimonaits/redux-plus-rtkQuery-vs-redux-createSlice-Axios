import React, { FC, useEffect, useState } from "react";
import PostItemAxios from "../PostItemAxios/PostItemAxios";
import cl from "./PostsReduxAndAxios.module.css";
import Loader from "../UI/Loader/Loader";
import MyButton from "../UI/button/MyButton";
import { IPost } from "../../models/IPosts";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  createPost,
  fetchPosts,
  deletePost,
  updatePost,
} from "../../store/reducers/posts/PostsActions";
import { postAPI } from "../../services/PostsService";
import arraysAreEqual from "../../services/arraysEqual";

const PostsReduxAndAxios: FC = () => {
  const dispatch = useAppDispatch();
  const { posts, isLoading, error } = useAppSelector(
    (state) => state.PostReducer
  );

  const [limit, setLimit] = useState(15);

  const { data: RTKposts } = postAPI.useFetchAllPostsQuery(limit);

  useEffect(() => {
    dispatch(fetchPosts(limit));
  }, [dispatch, limit]);

  useEffect(() => {
    if (RTKposts) {
      const equal = arraysAreEqual(RTKposts, posts);
      !equal && dispatch(fetchPosts(limit));
    }
  }, [dispatch, RTKposts, limit]);

  const handleCreatePost = () => {
    const title = window.prompt("Enter post title");
    const body = window.prompt("Enter post title");

    const newPost = { title, body };

    if (title && body) {
      dispatch(createPost(newPost as IPost));
    } else alert("All fields must be created");
  };

  const handleRemove = (post: IPost) => {
    dispatch(deletePost(post));
  };

  const handleUpdate = (post: IPost) => {
    const title = window.prompt("Enter post title", post.title);
    const body = window.prompt("Enter post body", post.body);

    dispatch(updatePost({ ...post, title, body } as IPost));
  };

  return (
    <div className={cl.postContainer}>
      <h2 className={cl.heading}>
        Redux + PostsSlice + PostsActions(with Axios)
      </h2>
      <div className={cl.btnList}>
        <MyButton
          additionalClassName={cl.createPostBtn}
          onClick={() => handleCreatePost()}
        >
          Create Post
        </MyButton>
        <MyButton
          additionalClassName={cl.refetchBtn}
          onClick={() => dispatch(fetchPosts(limit))}
        >
          Refetch
        </MyButton>
        <select
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setLimit(parseInt(e.target.value))
          }
        >
          <option value={15}>Default</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
        </select>
      </div>
      <ul>
        {isLoading && <Loader />}
        {error && <h3>Error acquired</h3>}
        {posts &&
          posts.map((post) => (
            <PostItemAxios
              key={post.id}
              post={post}
              remove={handleRemove}
              update={handleUpdate}
            />
          ))}
      </ul>
    </div>
  );
};

export default PostsReduxAndAxios;
