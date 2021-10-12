import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { WelcomeComponent } from './welcome.component';

@NgModule({
  declarations: [WelcomeComponent],
  imports: [SharedModule],
})
export class WelcomeModule {}
