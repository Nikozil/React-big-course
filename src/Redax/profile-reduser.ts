import { type } from 'os';
import { stopSubmit } from 'redux-form';
import { ProfileAPI } from '../api/api';
import { PhotosType, PostType, ProfileType } from '../types/Types';

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
  ] as Array<PostType>,
  profile: null as null | ProfileType,
  status: null as null | string,
  newPostText: '',
};

export type InitialStateType = typeof initialState;

const profileReducer = (
  state = initialState,
  action: any
): InitialStateType => {
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
        profile: { ...state.profile, photos: action.photos } as ProfileType,
      };

    default:
      return state;
  }
};

export default profileReducer;
type addPostActionCreatorActionType = {
  type: typeof ADD_POST;
  NewPost: string;
};

export const addPostActionCreator = (
  text: string
): addPostActionCreatorActionType => ({
  type: ADD_POST,
  NewPost: text,
});
type deletePostActionType = {
  type: typeof DELETE_POST;
  id: number;
};
export const deletePost = (id: number): deletePostActionType => ({
  type: DELETE_POST,
  id,
});

type setUsersProfileActionCreatorActionType = {
  type: typeof SET_USER_PROFILE;
  profile: ProfileType;
};
export const setUsersProfile = (
  profile: ProfileType
): setUsersProfileActionCreatorActionType => ({
  type: SET_USER_PROFILE,
  profile,
});
type setUsersStatusActionCreatorActionType = {
  type: typeof SET_USER_STATUS;
  status: string;
};
export const setUsersStatus = (
  status: string
): setUsersStatusActionCreatorActionType => ({
  type: SET_USER_STATUS,
  status,
});
type savePhotoSuccessActionType = {
  type: typeof SAVE_PHOTO_SUCCESS;
  photos: PhotosType;
};
export const savePhotoSuccess = (
  photos: PhotosType
): savePhotoSuccessActionType => ({
  type: SAVE_PHOTO_SUCCESS,
  photos,
});

export const getUsersProfile = (userId: number) => async (dispatch: any) => {
  let data = await ProfileAPI.getProfile(userId);
  dispatch(setUsersProfile(data));
};

export const getUserStatus = (userId: number) => async (dispatch: any) => {
  let data = await ProfileAPI.getStatus(userId);
  dispatch(setUsersStatus(data));
};

export const updateUserStatus = (status: string) => async (dispatch: any) => {
  let data = await ProfileAPI.setStatus(status);
  if (data.resultCode === 0) {
    dispatch(setUsersStatus(status));
  }
};
export const savePhoto = (photo: string) => async (dispatch: any) => {
  let data = await ProfileAPI.savePhoto(photo);
  if (data.resultCode === 0) {
    dispatch(savePhotoSuccess(data.data.photos));
  }
};
export const saveProfile =
  (profile: ProfileType) => async (dispatch: any, getState: any) => {
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