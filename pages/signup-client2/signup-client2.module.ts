import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignupClient2Page } from './signup-client2';

@NgModule({
  declarations: [
    SignupClient2Page,
  ],
  imports: [
    IonicPageModule.forChild(SignupClient2Page),
  ],
  exports: [
    SignupClient2Page
  ]
})
export class ClientQtnPageModule {}
