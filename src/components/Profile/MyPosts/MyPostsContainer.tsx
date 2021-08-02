import { Dispatch } from 'react';
import { connect } from 'react-redux';
import { actions, ActionsTypes } from '../../../Redax/profile-reducer';
import { AppStateType } from '../../../Redax/redux-store';
import { PostType } from '../../../types/Types';
import MyPosts from './MyPosts';

type mapStateToPropsType = {
  postsData: Array<PostType>;
  newPostText: string;
};
type mapDispatchToPropsType = {
  addPost: (text: string) => void;
};

let mapStateToProps = (state: AppStateType): mapStateToPropsType => {
  return {
    postsData: state.profilePage.posts,
    newPostText: state.profilePage.newPostText,
  };
};
let mapDispatchToProps = (
  dispatch: Dispatch<ActionsTypes>
): mapDispatchToPropsType => {
  return {
    addPost: (text: string) => {
      dispatch(actions.addPostActionCreator(text));
    },
  };
};

const MyPostsContainer = connect<
  mapStateToPropsType,
  mapDispatchToPropsType,
  {},
  AppStateType
>(
  mapStateToProps,
  mapDispatchToProps
)(MyPosts);

export default MyPostsContainer;
