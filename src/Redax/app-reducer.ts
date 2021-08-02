import { ThunkAction } from 'redux-thunk';
import { makelogin } from './auth-reducer';
import { AppStateType, InferActionsTypes } from './redux-store';

let initialState = {
  initialized: false,
};

export type InitialStateType = typeof initialState;

const appReducer = (
  state: InitialStateType = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case 'learningReact/app/SET_INITIALIZED':
      return {
        ...state,
        initialized: true,
      };

    default:
      return state;
  }
};

type ActionsTypes = InferActionsTypes<typeof actions>;
const actions = {
  initializedSucessed: () =>
    ({
      type: 'learningReact/app/SET_INITIALIZED',
    } as const),
};

export const initializeAPP = (): ThunkAction<
  void,
  AppStateType,
  unknown,
  ActionsTypes
> => {
  return (dispatch) => {
    let promise = dispatch(makelogin());

    Promise.all([promise]).then(() => {
      dispatch(actions.initializedSucessed());
    });
  };
};

export default appReducer;
