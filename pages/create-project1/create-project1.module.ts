import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateProject1Page } from './create-project1';

@NgModule({
  declarations: [
    CreateProject1Page,
  ],
  imports: [
    IonicPageModule.forChild(CreateProject1Page),
  ],
  exports: [
    CreateProject1Page
  ]
})
export class CreateProject1PageModule {}
