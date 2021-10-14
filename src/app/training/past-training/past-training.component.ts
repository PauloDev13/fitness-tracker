import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';

import { Exercise } from '../exercise-model';
import * as fromTraining from '../reducers/training.reducer';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css'],
})
export class PastTrainingComponent implements OnInit, AfterViewInit {
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];

  // exercisesChangedSubscription!: Subscription;
  dataSource = new MatTableDataSource<Exercise>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private trainingService: TrainingService,
    private stores: Store<fromTraining.IState>,
  ) {}

  ngOnInit(): void {
    this.stores
      .select(fromTraining.getFinishedExercises)
      .subscribe((exercises: Exercise[]) => (this.dataSource.data = exercises));
    // this.exercisesChangedSubscription =
    //   this.trainingService.finishedExercisesChanged.subscribe((exercises) => {
    //     this.dataSource.data = exercises;
    //   });
    this.trainingService.fetchCompletedOrCancelledExercises();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(event: KeyboardEvent) {
    this.dataSource.filter = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
  }

  // ngOnDestroy(): void {
  //   if (this.exercisesChangedSubscription) {
  //     this.exercisesChangedSubscription.unsubscribe();
  //   }
  // }
}
