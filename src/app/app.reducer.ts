export type TypeState = {
  isLoading: boolean;
};

type TypeAction = {
  type: string;
};

const initialState: TypeState = {
  isLoading: false,
};

export function appReducer(state = initialState, action: TypeAction) {
  switch (action.type) {
    case 'START_LOADING':
      return {
        isLoading: true,
      };
    case 'STOP_LOADING':
      return {
        isLoading: false,
      };
    default:
      return state;
  }
}
