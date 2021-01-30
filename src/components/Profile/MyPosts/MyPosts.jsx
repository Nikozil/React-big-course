import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = (props) => {
  return (
    <div className={s.postsBlock}>
      <h3>My posts</h3>
      <div>
        <div>
          <textarea></textarea>
        </div>
        <button>Add post</button>
        <div></div>
      </div>
      {props.postsData.map((i) => (
        <Post message={i.message} likesCount={i.likesCount} />
      ))}
    </div>
  );
};

export default MyPosts;
