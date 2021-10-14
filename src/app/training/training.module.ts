import { NgModule } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { StoreModule } from '@ngrx/store';

import { StopTrainingComponent } from '../components/dialogs/stop-training.component';
import { MyCustomPaginatorIntl } from '../shared/my-custom-paginator-intl';
import { SharedModule } from '../shared/shared.module';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingComponent } from './past-training/past-training.component';
import { trainingReducer } from './reducers/training.reducer';
import { TrainingRouterModule } from './training-router.module';
import { TrainingComponent } from './training.component';

@NgModule({
  declarations: [
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingComponent,
    TrainingComponent,
    StopTrainingComponent,
  ],
  imports: [
    SharedModule,
    TrainingRouterModule,
    StoreModule.forFeature('training', trainingReducer),
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: MyCustomPaginatorIntl }],
})
export class TrainingModule {}
