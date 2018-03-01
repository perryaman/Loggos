import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddStrategistToProjectPage } from './add-strategist-to-project';

@NgModule({
  declarations: [
    AddStrategistToProjectPage,
  ],
  imports: [
    IonicPageModule.forChild(AddStrategistToProjectPage),
  ],
  exports: [
    AddStrategistToProjectPage
  ]
})
export class AddStrategistToProjectPageModule {}
