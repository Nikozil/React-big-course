import { FormAction, stopSubmit } from 'redux-form';
import { ResultCodeEnum } from '../api/api';
import { ProfileAPI } from '../api/profile-api';
import { PhotosType, PostType, ProfileType } from '../types/Types';
import { BaseThunkType, InferActionsTypes } from './redux-store';

let initialState = {
  posts: [
    { id: 1, message: 'Hi, how are your?', likesCount: 2 },
    { id: 2, message: "It's my first", likesCount: 3 },
    { id: 3, message: 'olololo', likesCount: 20 },
  ] as Array<PostType>,
  profile: null as null | ProfileType,
  status: '' as string,
  newPostText: '',
};

export type InitialStateType = typeof initialState;

const profileReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case 'learningReact/profile/ADD-POST': {
      let newPost = {
        id: 5,
        message: action.NewPost,
        likesCount: 0,
      };

      return { ...state, posts: [...state.posts, newPost], newPostText: '' };
    }
    case 'learningReact/profile/DELETE-POST': {
      return {
        ...state,
        posts: state.posts.filter((i) => i.id !== action.id),
      };
    }

    case 'learningReact/profile/SET-USER-PROFILE':
      return {
        ...state,
        profile: action.profile,
      };
    case 'learningReact/profile/SET-USER-STATUS':
      return {
        ...state,
        status: action.status,
      };
    case 'learningReact/profile/SAVE-PHOTO-SUCCESS':
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos } as ProfileType,
      };

    default:
      return state;
  }
};

export default profileReducer;

export type ActionsTypes = InferActionsTypes<typeof actions>;
export const actions = {
  addPostActionCreator: (text: string) =>
    ({
      type: 'learningReact/profile/ADD-POST',
      NewPost: text,
    } as const),
  deletePost: (id: number) =>
    ({
      type: 'learningReact/profile/DELETE-POST',
      id,
    } as const),
  setUsersProfile: (profile: ProfileType) =>
    ({
      type: 'learningReact/profile/SET-USER-PROFILE',
      profile,
    } as const),
  setUsersStatus: (status: string) =>
    ({
      type: 'learningReact/profile/SET-USER-STATUS',
      status,
    } as const),
  savePhotoSuccess: (photos: PhotosType) =>
    ({
      type: 'learningReact/profile/SAVE-PHOTO-SUCCESS',
      photos,
    } as const),
};

type ThunkType = BaseThunkType<ActionsTypes>;
type ThunkSaveProfileType = BaseThunkType<ActionsTypes | FormAction>;

export const getUsersProfile =
  (userId: number): ThunkType =>
  async (dispatch) => {
    let data = await ProfileAPI.getProfile(userId);
    dispatch(actions.setUsersProfile(data));
  };

export const getUserStatus =
  (userId: number): ThunkType =>
  async (dispatch) => {
    let data = await ProfileAPI.getStatus(userId);
    dispatch(actions.setUsersStatus(data));
  };

export const updateUserStatus =
  (status: string): ThunkType =>
  async (dispatch) => {
    let data = await ProfileAPI.setStatus(status);
    if (data.resultCode === ResultCodeEnum.Success) {
      dispatch(actions.setUsersStatus(status));
    }
  };
export const savePhoto =
  (photo: File): ThunkType =>
  async (dispatch) => {
    let data = await ProfileAPI.savePhoto(photo);
    if (data.resultCode === ResultCodeEnum.Success) {
      dispatch(actions.savePhotoSuccess(data.data.photos));
    }
  };
export const saveProfile =
  (profile: ProfileType): ThunkSaveProfileType =>
  async (dispatch, getState) => {
    const userId = getState().auth.userId;
    let data = await ProfileAPI.saveProfile(profile);
    if (userId === null) throw new Error('userId cant be null');
    if (data.resultCode === ResultCodeEnum.Success) {
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
