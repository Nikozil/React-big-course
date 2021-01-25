import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = () => {
  return (
    <div>
      My posts
      <div>
        <textarea></textarea>
        <button>Add post</button>
      </div>
      <Post message="Hi, how are your?" />
      <Post message="It's my first" />
      <Post message="olololo" />
    </div>
  );
};

export default MyPosts;
