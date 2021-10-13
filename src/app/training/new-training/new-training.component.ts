import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import * as fromRoot from '../../app.reducer';
import { UiService } from '../../shared/ui.service';
import { Exercise } from '../exercise-model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises!: Exercise[];
  isLoading$!: Observable<boolean>;
  private exercisesSubscription!: Subscription;

  // private loadingSubs!: Subscription;

  constructor(
    private trainingService: TrainingService,
    private uiService: UiService,
    private store: Store<fromRoot.IState>,
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.exercisesSubscription =
      this.trainingService.exercisesChanged.subscribe((exercises) => {
        this.exercises = exercises;
      });

    // this.loadingSubs = this.uiService.loadingStateChanged.subscribe(
    //   (loading: boolean) => {
    //     this.isLoading = loading;
    //   },
    // );
    this.fetchExercises();
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

  ngOnDestroy(): void {
    if (this.exercisesSubscription) {
      this.exercisesSubscription.unsubscribe();
    }
    // if (this.loadingSubs) {
    //   this.loadingSubs.unsubscribe();
    // }
  }
}
