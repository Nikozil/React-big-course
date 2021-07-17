import { ThunkAction } from 'redux-thunk';
import { makelogin } from './auth-reduser';
import { AppStateType } from './redux-store';

const SET_INITIALIZED = 'learningReact/app/SET_INITIALIZED';

export type InitialStateType = {
  initialized: boolean;
};

let initialState: InitialStateType = {
  initialized: false,
};

const appReducer = (
  state: InitialStateType = initialState,
  action: initializedSucessedActionType
): InitialStateType => {
  switch (action.type) {
    case SET_INITIALIZED:
      return {
        ...state,
        initialized: true,
      };

    default:
      return state;
  }
};

type initializedSucessedActionType = {
  type: typeof SET_INITIALIZED;
};

export const initializedSucessed = (): initializedSucessedActionType => ({
  type: SET_INITIALIZED,
});

export const initializeAPP = (): ThunkAction<
  void,
  AppStateType,
  unknown,
  initializedSucessedActionType
> => {
  return (dispatch) => {
    let promise = dispatch(makelogin());

    Promise.all([promise]).then(() => {
      dispatch(initializedSucessed());
    });
  };
};

export default appReducer;
