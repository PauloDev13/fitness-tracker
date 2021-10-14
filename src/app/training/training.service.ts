import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import * as UI from '../shared/actions/ui.action';
import { UiService } from '../shared/ui.service';
import * as Training from '../training/actions/training.action';
import * as fromTraining from '../training/reducers/training.reducer';
import { Exercise } from './exercise-model';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();
  private availableExercises!: Exercise[];
  private runningExercises!: Exercise | undefined;
  private firebaseSubs: Subscription[] = [];

  constructor(
    private firestore: AngularFirestore,
    private uiService: UiService,
    private store: Store<fromTraining.IState>,
  ) {}

  fetchAvailableExercises(): void {
    this.uiService.loadingStateChanged.next(true);

    this.firebaseSubs.push(
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
        .subscribe(
          (exercises: Exercise[]) => {
            this.store.dispatch(new UI.StopLoading());
            // this.uiService.loadingStateChanged.next(false);
            this.store.dispatch(new Training.SetAvailableTrainings(exercises));
            // this.availableExercises = exercises;
            // this.exercisesChanged.next([...this.availableExercises]);
          },
          () => {
            this.store.dispatch(new UI.StopLoading());
            // this.uiService.loadingStateChanged.next(false);
            this.uiService.showSnackbarSimple(
              'Erro inesperado. Tente novamente mais tarde',
            );
            this.exercisesChanged.next(undefined);
          },
        ),
    );
  }

  startExercise(selectedId: string): void {
    this.store.dispatch(new Training.StartTraining(selectedId));
    // this.runningExercises = this.availableExercises.find(
    //   (ex) => ex.id === selectedId,
    // );
    // this.exerciseChanged.next({ ...this.runningExercises! });
  }

  completeExercise(): void {
    this.addDataToDatabase({
      ...this.runningExercises!,
      date: new Date(),
      state: 'concluído',
    });
    this.store.dispatch(new Training.StopTraining());
    // this.runningExercises = undefined;
    // this.exerciseChanged.next(undefined);
  }

  cancelledExercise(progress: number): void {
    this.addDataToDatabase({
      ...this.runningExercises!,
      duration: this.runningExercises?.duration! * (progress / 100),
      calories: this.runningExercises?.calories! * (progress / 100),
      date: new Date(),
      state: 'cancelado',
    });

    this.store.dispatch(new Training.StopTraining());
    // this.runningExercises = undefined;
    // this.exerciseChanged.next(undefined);
  }

  getRunningExercise(): Exercise {
    return { ...this.runningExercises! };
  }

  fetchCompletedOrCancelledExercises() {
    this.firebaseSubs.push(
      this.firestore
        .collection<Exercise>('finishedExercises')
        .valueChanges()
        .subscribe((exercises: Exercise[]) => {
          this.store.dispatch(new Training.SetFinishedTrainings(exercises));
          //this.finishedExercisesChanged.next(exercises);
        }),
    );
  }

  cancelSubscriptions() {
    this.firebaseSubs.forEach((sub) => sub.unsubscribe());
  }

  private addDataToDatabase(exercises: Exercise) {
    this.firestore.collection('finishedExercises').add(exercises).then();
  }
}
