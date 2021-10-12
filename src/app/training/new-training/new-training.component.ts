import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

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
  isLoading = true;
  private exercisesSubscription!: Subscription;
  private loadingSubs!: Subscription;

  constructor(
    private trainingService: TrainingService,
    private uiService: UiService,
  ) {}

  ngOnInit(): void {
    this.exercisesSubscription =
      this.trainingService.exercisesChanged.subscribe((exercises) => {
        this.exercises = exercises;
      });

    this.loadingSubs = this.uiService.loadingStateChanged.subscribe(
      (loading: boolean) => {
        this.isLoading = loading;
      },
    );
    this.fetchExercises();
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

  ngOnDestroy(): void {
    this.exercisesSubscription.unsubscribe();
    this.loadingSubs.unsubscribe();
  }
}
