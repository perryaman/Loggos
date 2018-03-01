import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateProject2Page } from './create-project2';

@NgModule({
  declarations: [
    CreateProject2Page,
  ],
  imports: [
    IonicPageModule.forChild(CreateProject2Page),
  ],
  exports: [
    CreateProject2Page
  ]
})
export class CreateProject2PageModule {}
