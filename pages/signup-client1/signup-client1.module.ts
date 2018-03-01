import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignupClient1Page } from './signup-client1';

@NgModule({
  declarations: [
    SignupClient1Page,
  ],
  imports: [
    IonicPageModule.forChild(SignupClient1Page),
  ],
  exports: [
    SignupClient1Page
  ]
})
export class ClientQtnPageModule {}
