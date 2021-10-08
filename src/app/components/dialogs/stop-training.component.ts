import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

type dataType = {
  progress: number;
};

@Component({
  selector: 'app-stop-training',
  template: `
    <h1>Tem certeza?</h1>
    <mat-dialog-content>
      <p>Você já tem {{ passedData.progress }}%</p>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button [mat-dialog-close]="true">Sim</button>
      <button mat-button [mat-dialog-close]="false">Não</button>
    </mat-dialog-actions>
  `,
})
export class StopTrainingComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public passedData: dataType) {}

  ngOnInit(): void {}
}
