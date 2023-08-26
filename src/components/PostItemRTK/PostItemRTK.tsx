import React, { FC } from "react";
import { IPost } from "../../models/IPosts";
import cl from "./PostItem.module.css";
import MyButton from "../UI/button/MyButton";

interface PostItemProps {
  post: IPost;
  remove: (post: IPost) => void;
  update: (post: IPost) => void;
}

const PostItemAxios: FC<PostItemProps> = ({ post, remove, update }) => {
  return (
    <li className={cl.postItem}>
      <div>
        <strong>
          #{post.id} - {post.title}
        </strong>
        <p>{post.body}</p>
      </div>
      <div className={cl.btnList}>
        <MyButton onClick={() => update(post)}>Update</MyButton>
        <MyButton onClick={() => remove(post)}>Delete</MyButton>
      </div>
    </li>
  );
};

export default PostItemAxios;
