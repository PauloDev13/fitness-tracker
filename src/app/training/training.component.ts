import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css'],
})
export class TrainingComponent implements OnInit, OnDestroy {
  exercisesSubscription!: Subscription;
  onGoingTraining = false;

  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.exercisesSubscription = this.trainingService.exerciseChanged.subscribe(
      (exercise) => {
        this.onGoingTraining = !!exercise;
      },
    );
  }

  ngOnDestroy(): void {
    if (this.exercisesSubscription) {
      this.exercisesSubscription.unsubscribe();
    }
  }
}
