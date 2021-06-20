import { makelogin } from './auth-reduser';

const SET_INITIALIZED = 'learningReact/app/SET_INITIALIZED';

export type InitialStateType = {
  initialized: boolean;
};

let initialState: InitialStateType = {
  initialized: false,
};

const appReducer = (
  state: InitialStateType = initialState,
  action: any
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

export const initializeAPP = () => {
  return (dispatch: any) => {
    let promise = dispatch(makelogin());

    Promise.all([promise]).then(() => {
      dispatch(initializedSucessed());
    });
  };
};

export default appReducer;
