type State = 'completed' | 'cancelled' | null;

interface ExerciseModel {
  id: string;
  name: string;
  duration: number;
  calories: number;
  date?: Date;
  state?: State;
}

export type Exercise = ExerciseModel;
