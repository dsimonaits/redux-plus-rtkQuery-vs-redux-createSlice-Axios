/* eslint-disable no-empty-pattern */
import React, { FC, useEffect, useState } from "react";
import { postAPI } from "../../services/PostsService";
import PostItemAxios from "../PostItemAxios/PostItemAxios";
import cl from "./PostsReduxAndRTK.module.css";
import Loader from "../UI/Loader/Loader";
import MyButton from "../UI/button/MyButton";
import { IPost } from "../../models/IPosts";
import { useAppSelector } from "../../hooks/redux";
import arraysAreEqual from "../../services/arraysEqual";

const PostsReduxAndRTK: FC = () => {
  const { posts: AxiosPosts } = useAppSelector((state) => state.PostReducer);

  const [limit, setLimit] = useState(15);

  const {
    data: posts,
    isLoading,
    error,
    refetch,
  } = postAPI.useFetchAllPostsQuery(limit);

  const [createPost, {}] = postAPI.useCreatePostsMutation();
  const [updatePost, {}] = postAPI.useUpdatePostMutation();
  const [removePost, {}] = postAPI.useDeletePostMutation();

  useEffect(() => {
    if (AxiosPosts && posts) {
      const equal = arraysAreEqual(posts, AxiosPosts);
      !equal && refetch();
    }
  }, [AxiosPosts]);

  const handleCreatePost = () => {
    const title = window.prompt("Enter post title");
    const body = window.prompt("Enter post title");

    const newPost = { title, body };

    if (title && body) {
      createPost(newPost as IPost);
    } else alert("All fields must be created");
  };

  const handleRemove = (post: IPost) => {
    removePost(post);
  };

  const handleUpdate = (post: IPost) => {
    const title = window.prompt("Enter post title", post.title);
    const body = window.prompt("Enter post body", post.body);

    updatePost({ ...post, title, body } as IPost);
  };

  return (
    <div className={cl.postContainer}>
      <h2 className={cl.heading}>Redux + PostsService (RTK Query)</h2>
      <div className={cl.btnList}>
        <MyButton
          additionalClassName={cl.createPostBtn}
          onClick={() => handleCreatePost()}
        >
          Create Post
        </MyButton>
        <MyButton additionalClassName={cl.refetchBtn} onClick={() => refetch()}>
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
              update={handleUpdate}
              remove={handleRemove}
            />
          ))}
      </ul>
    </div>
  );
};

export default PostsReduxAndRTK;
