import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stop-training',
  template: `
    <h1>Tem certeza?</h1>
    <mat-dialog-actions>
      <button mat-button [mat-dialog-close]="true">Sim</button>
      <button mat-button [mat-dialog-close]="false">Não</button>
    </mat-dialog-actions>
  `,
})
export class StopTrainingComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
