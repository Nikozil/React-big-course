import { connect } from 'react-redux';
import { addPostActionCreator } from '../../../Redax/profile-reduser';
import MyPosts from './MyPosts';

let mapStateToProps = (state) => {
  return {
    postsData: state.profilePage.posts,
    newPostText: state.profilePage.newPostText,
  };
};
let mapDispatchToProps = (dispatch) => {
  return {
    addPost: (text) => {
      dispatch(addPostActionCreator(text));
    },
  };
};

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;
