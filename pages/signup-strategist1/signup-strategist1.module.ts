import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignupStrategist1Page } from './signup-strategist1';

@NgModule({
  declarations: [
    SignupStrategist1Page,
  ],
  imports: [
    IonicPageModule.forChild(SignupStrategist1Page),
  ],
  exports: [
    SignupStrategist1Page
  ]
})
export class ClientQtnPageModule {}
