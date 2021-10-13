import { START_LOADING, STOP_LOADING, UIActions } from '../actions/ui.action';

export interface InterState {
  isLoading: boolean;
}

const initialState: InterState = {
  isLoading: false,
};

export const uiReducer = (state = initialState, action: UIActions) => {
  switch (action.type) {
    case START_LOADING:
      return {
        isLoading: true,
      };
    case STOP_LOADING:
      return {
        isLoading: false,
      };
    default:
      return state;
  }
};

export const getIsLoading = (state: InterState) => state.isLoading;
