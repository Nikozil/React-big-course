import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = () => {
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
      <Post message="Hi, how are your?" likesCount="2" />
      <Post message="It's my first" likesCount="3" />
      <Post message="olololo" likesCount="20" />
    </div>
  );
};

export default MyPosts;
