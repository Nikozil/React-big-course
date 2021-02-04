import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = (props) => {
  let newPostElement = React.createRef();
  let addPost = (event) => {
    props.addPost();
  };
  let onPostChange = () => {
    let text = newPostElement.current.value;

    props.updateNewPost(text);
  };

  return (
    <div className={s.postsBlock}>
      <h3>My posts</h3>
      <div>
        <div>
          <textarea
            ref={newPostElement}
            value={props.newPostText}
            onChange={onPostChange}
          />
        </div>

        <button onClick={addPost}>Add post</button>
        <div></div>
      </div>
      {props.postsData.map((i) => (
        <Post message={i.message} likesCount={i.likesCount} />
      ))}
    </div>
  );
};

export default MyPosts;
