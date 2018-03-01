import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignupDesigner1Page } from './signup-designer1';

@NgModule({
  declarations: [
    SignupDesigner1Page,
  ],
  imports: [
    IonicPageModule.forChild(SignupDesigner1Page),
  ],
  exports: [
    SignupDesigner1Page
  ]
})
export class SignupClient1PageModule {}
