import React from 'react';
import { Field, Form } from 'react-final-form';
import { PostType } from '../../../types/Types';
import {
  composeValidators,
  maxLengthCreator,
  required,
} from '../../../utils/validators/validates';
import s from './MyPosts.module.css';
import Post from './Post/Post';

type MyPostsType = {
  addPost: (text: string) => void;
  postsData: Array<PostType>;
};

const MyPosts: React.FC<MyPostsType> = React.memo((props) => {
  let addPost = (text: string) => {
    props.addPost(text);
  };

  return (
    <div className={s.postsBlock}>
      <h3>My posts</h3>
      <div>
        <MyPostsForm addPost={addPost} />
      </div>
      {props.postsData.map((i) => (
        <Post
          message={i.message}
          id={i.id}
          likesCount={i.likesCount}
          key={i.id}
        />
      ))}
    </div>
  );
});

type PropsType = {
  addPost: (post: string) => void;
};

const MyPostsForm: React.FC<PropsType> = (props) => {
  return (
    <Form
      onSubmit={(postData) => {
        props.addPost(postData.post);
      }}
      render={({ handleSubmit }) => {
        return (
          <form onSubmit={handleSubmit}>
            <div>
              <Field
                validate={composeValidators(required, maxLengthCreator(30))}
                name="post"
                component="textarea"
                type="text"
                placeholder="Enter your post"></Field>
            </div>
            <button type="submit">Add Post</button>
          </form>
        );
      }}
    />
  );
};

export default MyPosts;
