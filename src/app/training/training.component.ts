import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromTraining from '../training/reducers/training.reducer';

// import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css'],
})
export class TrainingComponent implements OnInit {
  // exercisesSubscription!: Subscription;
  onGoingTraining$!: Observable<boolean>;

  // onGoingTraining = false;

  constructor(
    // private trainingService: TrainingService,
    private store: Store<fromTraining.IState>,
  ) {}

  ngOnInit(): void {
    this.onGoingTraining$ = this.store.select(fromTraining.getIsTraining);
    // this.exercisesSubscription = this.trainingService.exerciseChanged.subscribe(
    //   (exercise) => {
    //     this.onGoingTraining = !!exercise;
    //   },
    // );
  }

  // ngOnDestroy(): void {
  //   if (this.exercisesSubscription) {
  //     this.exercisesSubscription.unsubscribe();
  //   }
  // }
}
