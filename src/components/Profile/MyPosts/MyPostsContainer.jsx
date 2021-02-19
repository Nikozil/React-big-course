import React from 'react';
import { connect } from 'react-redux';
import {
  addPostActionCreator,
  UpdateNewPostTextActionCreator,
} from '../../../Redax/profile-reduser';
import StoreContext from '../../../StoreContext';
import MyPosts from './MyPosts';

// const MyPostsContainer = (props) => {
//   // let state = props.appStore.getState();
//   // let dispatch = props.appStore.dispatch.bind(props.appStore);
//   // let addPost = () => {
//   //   dispatch(addPostActionCreator());
//   // };
//   // let onPostChange = (text) => {
//   //   dispatch(UpdateNewPostTextActionCreator(text));
//   // };
//   return (
//     <StoreContext.Consumer>
//       {(store) => {
//         let state = store.getState();
//         let dispatch = store.dispatch.bind(props.appStore);
//         let addPost = () => {
//           dispatch(addPostActionCreator());
//         };
//         let onPostChange = (text) => {
//           dispatch(UpdateNewPostTextActionCreator(text));
//         };

//         return (
//           <MyPosts
//             // addPost={addPost}
//             // onPostChange={onPostChange}
//             // postsData={state.profilePage.posts}
//             // newPostText={state.profilePage.newPostText}

//             addPost={addPost}
//             onPostChange={onPostChange}
//             postsData={state.profilePage.posts}
//             newPostText={state.profilePage.newPostText}
//           />
//         );
//       }}
//     </StoreContext.Consumer>
//   );
// };

let mapStateToProps = (state) => {
  return {
    postsData: state.profilePage.posts,
    newPostText: state.profilePage.newPostText,
  };
};
let mapDispatchToProps = (dispatch) => {
  return {
    addPost: () => {
      dispatch(addPostActionCreator());
    },
    onPostChange: (text) => {
      dispatch(UpdateNewPostTextActionCreator(text));
    },
  };
};

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;
