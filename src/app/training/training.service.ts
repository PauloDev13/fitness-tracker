import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Exercise } from './exercise-model';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  exerciseChanged = new Subject<Exercise>();

  private availableExercises: Exercise[] = [
    { id: '1', name: 'abdominais', duration: 30, calories: 8 },
    { id: '2', name: 'flexões', duration: 20, calories: 1 },
    { id: '3', name: 'polichinelos', duration: 60, calories: 30 },
    { id: '4', name: 'jump', duration: 120, calories: 100 },
  ];

  private runningExercises!: Exercise | undefined;

  constructor() {}

  getExercises(): Exercise[] {
    return this.availableExercises.slice();
  }

  startExercise(selectedId: string) {
    this.runningExercises = this.availableExercises.find(
      (ex) => ex?.id === selectedId,
    );

    this.exerciseChanged.next({ ...this.runningExercises! });
  }
}
