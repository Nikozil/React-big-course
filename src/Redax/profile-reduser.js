import { ProfileAPI } from '../api/api';

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_USER_STATUS = 'SET-USER-STATUS';

let initialState = {
  posts: [
    { id: 1, message: 'Hi, how are your?', likesCount: 2 },
    { id: 2, message: "It's my first", likesCount: 3 },
    { id: 3, message: 'olololo', likesCount: 20 },
  ],
  profile: null,
  status: null,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      let newPost = {
        id: 5,
        message: action.NewPost,
        likesCount: 0,
      };

      return { ...state, posts: [...state.posts, newPost], newPostText: '' };
    }

    case SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile,
      };
    case SET_USER_STATUS:
      return {
        ...state,
        status: action.status,
      };
    default:
      return state;
  }
};

export default profileReducer;

export const addPostActionCreator = (text) => ({
  type: ADD_POST,
  NewPost: text,
});

export const setUsersProfile = (profile) => ({
  type: SET_USER_PROFILE,
  profile,
});
export const setUsersStatus = (status) => ({
  type: SET_USER_STATUS,
  status,
});

export const getUsersProfile = (userId) => {
  return (dispatch) => {
    ProfileAPI.getProfile(userId).then((data) => {
      dispatch(setUsersProfile(data));
    });
  };
};
export const getUserStatus = (userId) => {
  return (dispatch) => {
    ProfileAPI.getStatus(userId).then((data) => {
      dispatch(setUsersStatus(data));
    });
  };
};
export const updateUserStatus = (status) => {
  return (dispatch) => {
    ProfileAPI.setStatus(status).then((data) => {
      if (data.resultCode === 0) {
        dispatch(setUsersStatus(status));
      }
    });
  };
};
