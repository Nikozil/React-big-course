import { stopSubmit } from 'redux-form';
import { ProfileAPI } from '../api/api';

const ADD_POST = 'learningReact/profile/ADD-POST';
const DELETE_POST = 'learningReact/profile/DELETE-POST';
const SET_USER_PROFILE = 'learningReact/profile/SET-USER-PROFILE';
const SET_USER_STATUS = 'learningReact/profile/SET-USER-STATUS';
const SAVE_PHOTO_SUCCESS = 'learningReact/profile/SAVE-PHOTO-SUCCESS';

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
    case DELETE_POST: {
      return {
        ...state,
        posts: state.posts.filter((i) => i.id !== action.id),
      };
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
    case SAVE_PHOTO_SUCCESS:
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos },
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
export const deletePost = (id) => ({
  type: DELETE_POST,
  id,
});

export const setUsersProfile = (profile) => ({
  type: SET_USER_PROFILE,
  profile,
});
export const setUsersStatus = (status) => ({
  type: SET_USER_STATUS,
  status,
});
export const savePhotoSuccess = (photos) => ({
  type: SAVE_PHOTO_SUCCESS,
  photos,
});

export const getUsersProfile = (userId) => async (dispatch) => {
  let data = await ProfileAPI.getProfile(userId);
  dispatch(setUsersProfile(data));
};

export const getUserStatus = (userId) => async (dispatch) => {
  let data = await ProfileAPI.getStatus(userId);
  dispatch(setUsersStatus(data));
};

export const updateUserStatus = (status) => async (dispatch) => {
  let data = await ProfileAPI.setStatus(status);
  if (data.resultCode === 0) {
    dispatch(setUsersStatus(status));
  }
};
export const savePhoto = (photo) => async (dispatch) => {
  let data = await ProfileAPI.savePhoto(photo);
  if (data.resultCode === 0) {
    dispatch(savePhotoSuccess(data.data.photos));
  }
};
export const saveProfile = (profile) => async (dispatch, getState) => {
  const userId = getState().auth.userId;
  let data = await ProfileAPI.saveProfile(profile);
  if (data.resultCode === 0) {
    dispatch(getUsersProfile(userId));
  } else {
    dispatch(stopSubmit('profileData', { _error: data.messages[0] }));
    // let message = data.messages[0]
    //   .match(/->\b\w+\b/gi)[0]
    //   .slice(2)
    //   .toLowerCase();
    // dispatch(
    //   stopSubmit('profileData', {
    //     contacts: { facebook: message },
    //   })
    // );

    // .match(/->\b\w+\b/gi)[0].slice(2).toLowerCase()

    return Promise.reject(data.messages[0]);
  }
};
