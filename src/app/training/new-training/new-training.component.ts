import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { Exercise } from '../exercise-model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit {
  exercises!: Observable<Exercise[]>;

  constructor(
    private trainingService: TrainingService,
    private firestore: AngularFirestore,
  ) {}

  ngOnInit(): void {
    this.exercises = this.firestore
      .collection<Exercise>('availableExercises')
      .valueChanges();
    // this.exercises = this.trainingService.getExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }
}
