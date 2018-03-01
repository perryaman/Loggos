import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddCopywriterToProjectPage } from './add-copywriter-to-project';

@NgModule({
  declarations: [
    AddCopywriterToProjectPage,
  ],
  imports: [
    IonicPageModule.forChild(AddCopywriterToProjectPage),
  ],
  exports: [
    AddCopywriterToProjectPage
  ]
})
export class AddCopywriterToProjectPageModule {}
