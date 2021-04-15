import { makelogin } from './auth-reduser';

const SET_INITIALIZED = 'learningReact/app/SET_INITIALIZED';

let initialState = {
  initialized: false,
};

const appReducer = (state = initialState, action) => {
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

export const initializedSucessed = () => ({
  type: SET_INITIALIZED,
});

export const initializeAPP = () => {
  return (dispatch) => {
    let promise = dispatch(makelogin());

    Promise.all([promise]).then(() => {
      dispatch(initializedSucessed());
    });
  };
};

export default appReducer;
