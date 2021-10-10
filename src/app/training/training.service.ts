import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, Subject } from 'rxjs';

import { Exercise } from './exercise-model';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  itemsExercises!: Observable<Exercise[]>;
  private availableExercises: Exercise[] = [
    { id: '1', name: 'abdominais', duration: 60, calories: 8 },
    { id: '2', name: 'flexões', duration: 40, calories: 1 },
    { id: '3', name: 'polichinelos', duration: 100, calories: 30 },
    { id: '4', name: 'jump', duration: 120, calories: 100 },
  ];
  private runningExercises!: Exercise | undefined;
  private exercises: Exercise[] = [];

  constructor(private firestore: AngularFirestore) {
    this.itemsExercises = firestore
      .collection<Exercise>('availableExercises')
      .valueChanges();
  }

  getExercises(): Exercise[] {
    return this.availableExercises.slice();
  }

  getCompletedOrCancelExercises() {
    return this.itemsExercises;
  }

  startExercise(selectedId: string) {
    this.runningExercises = this.availableExercises.find(
      (ex) => ex.id === selectedId,
    );

    this.exerciseChanged.next({ ...this.runningExercises! });
  }

  completeExercise() {
    this.exercises.push({
      ...this.runningExercises!,
      date: new Date(),
      state: 'concluído',
    });
    this.runningExercises = undefined;
    this.exerciseChanged.next(undefined);
  }

  cancelledExercise(progress: number) {
    this.exercises.push({
      ...this.runningExercises!,
      duration: this.runningExercises?.duration! * (progress / 100),
      calories: this.runningExercises?.calories! * (progress / 100),
      date: new Date(),
      state: 'cancelado',
    });
    this.runningExercises = undefined;
    this.exerciseChanged.next(undefined);
  }

  getRunningExercise() {
    return { ...this.runningExercises! };
  }
}
