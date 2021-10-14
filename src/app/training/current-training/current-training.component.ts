import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { StopTrainingComponent } from '../../components/dialogs/stop-training.component';
import * as fromTraining from '../reducers/training.reducer';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css'],
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer!: any;

  constructor(
    private dialog: MatDialog,
    private trainingService: TrainingService,
    private store: Store<fromTraining.IState>,
  ) {}

  ngOnInit(): void {
    this.startResumeTimer();
  }

  startResumeTimer() {
    this.store.select(fromTraining.getActiveTraining).subscribe((exercise) => {
      if (exercise) {
        const step = (exercise.duration / 100) * 1000;

        this.timer = setInterval(() => {
          this.progress = this.progress + 1;

          if (this.progress > 100) {
            this.trainingService.completeExercise();
            clearInterval(this.timer);
          }
        }, step);
      }
    });
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.trainingService.cancelledExercise(this.progress);
        return;
      }
      this.startResumeTimer();
    });
  }
}
