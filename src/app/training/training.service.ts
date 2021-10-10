import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Exercise } from './exercise-model';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  private availableExercises!: Exercise[];
  private runningExercises!: Exercise | undefined;
  private exercises: Exercise[] = [];

  constructor(private firestore: AngularFirestore) {}

  fetchAvailableExercises(): void {
    this.firestore
      .collection<Exercise>('availableExercises')
      .snapshotChanges()
      .pipe(
        map((docArray) => {
          return docArray.map((doc) => {
            return {
              ...doc.payload.doc.data(),
              id: doc.payload.doc.id,
            };
          });
        }),
      )
      .subscribe((exercises: Exercise[]) => {
        this.availableExercises = exercises;
        this.exercisesChanged.next([...this.availableExercises]);
      });
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
