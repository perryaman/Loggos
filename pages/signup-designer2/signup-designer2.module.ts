import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignupDesigner2Page } from './signup-designer2';

@NgModule({
  declarations: [
    SignupDesigner2Page,
  ],
  imports: [
    IonicPageModule.forChild(SignupDesigner2Page),
  ],
  exports: [
    SignupDesigner2Page
  ]
})
export class SignupClient2PageModule {}
