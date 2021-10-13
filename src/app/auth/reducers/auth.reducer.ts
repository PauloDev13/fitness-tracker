import {
  AuthActions,
  AUTHENTICATED,
  NOT_AUTHENTICATED,
} from '../actions/auth.action';

export interface IState {
  isAuthenticated: boolean;
}

const initialState: IState = {
  isAuthenticated: false,
};

export const authReducer = (state = initialState, action: AuthActions) => {
  switch (action.type) {
    case AUTHENTICATED:
      return {
        isAuthenticated: true,
      };
    case NOT_AUTHENTICATED:
      return {
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export const getAuthenticated = (state: IState) => state.isAuthenticated;
