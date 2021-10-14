import * as fromRoot from '../../app.reducer';
import {
  SET_AVAILABLE_TRAININGS,
  SET_FINISHED_TRAININGS,
  START_TRAINING,
  STOP_TRAINING,
  TrainingActions,
} from '../actions/training.action';
import { Exercise } from '../exercise-model';

export interface TrainingState {
  availableExercises: Exercise[];
  finishedExercises: Exercise[];
  activeTraining: Exercise | null;
}

// export type TState = TrainingState & fromRoot.IState;

export interface IState extends fromRoot.IState {
  training: TrainingState;
}

const initialState: TrainingState = {
  availableExercises: [],
  finishedExercises: [],
  activeTraining: null,
};

export const trainingReducer = (
  state = initialState,
  action: TrainingActions,
) => {
  switch (action.type) {
    case SET_AVAILABLE_TRAININGS:
      return {
        ...state,
        availableExercises: action.payload,
      };
    case SET_FINISHED_TRAININGS:
      return {
        ...state,
        finishedExercises: action.payload,
      };
    case START_TRAINING:
      return {
        ...state,
        activeTraining: action.payload,
      };
    case STOP_TRAINING:
      return {
        ...state,
        activeTraining: null,
      };
    default:
      return state;
  }
};

export const getAvailableExercises = (state: TrainingState) =>
  state.availableExercises;

export const getFinishedExercises = (state: TrainingState) =>
  state.finishedExercises;

export const getStartExercise = (state: TrainingState) => state.activeTraining;
