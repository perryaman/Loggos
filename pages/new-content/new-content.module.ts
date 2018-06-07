import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewContentPage } from './new-content';

@NgModule({
  declarations: [
    NewContentPage,
  ],
  imports: [
    IonicPageModule.forChild(NewContentPage),
  ],
  exports: [
    NewContentPage
  ]
})
export class NewContentPageModule {}
