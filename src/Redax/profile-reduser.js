const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET-USER-PROFILE';

let initialState = {
  posts: [
    { id: 1, message: 'Hi, how are your?', likesCount: 2 },
    { id: 2, message: "It's my first", likesCount: 3 },
    { id: 3, message: 'olololo', likesCount: 20 },
  ],
  newPostText: 'Ololosha',
  profile: null,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      let newPost = {
        id: 5,
        message: state.newPostText,
        likesCount: 0,
      };

      return { ...state, posts: [...state.posts, newPost], newPostText: '' };
    }
    case UPDATE_NEW_POST_TEXT: {
      return { ...state, newPostText: action.newText };
    }
    case SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile,
      };
    default:
      return state;
  }
};

export default profileReducer;

export const addPostActionCreator = () => ({
  type: ADD_POST,
});

export const UpdateNewPostTextActionCreator = (text) => ({
  type: UPDATE_NEW_POST_TEXT,
  newText: text,
});
export const setUsersProfile = (profile) => ({
  type: SET_USER_PROFILE,
  profile,
});
