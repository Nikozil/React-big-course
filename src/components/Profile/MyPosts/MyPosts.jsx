import React from 'react';
import { Field, Form } from 'react-final-form';
import {
  maxLengthCreator,
  requireField,
  composeValidators,
} from '../../utils/validators/validates';
import { TextArea } from '../../commons/FormControls/FormsControls';
import s from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = (props) => {
  let addPost = (text) => {
    props.addPost(text);
  };

  return (
    <div className={s.postsBlock}>
      <h3>My posts</h3>
      <div>
        <MyPostsForm addPost={addPost} />
      </div>
      {props.postsData.map((i) => (
        <Post message={i.message} key={i.id} likesCount={i.likesCount} />
      ))}
    </div>
  );
};

const MyPostsForm = (props) => {
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
                validate={composeValidators(requireField, maxLengthCreator(30))}
                name="post"
                component={TextArea}
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
