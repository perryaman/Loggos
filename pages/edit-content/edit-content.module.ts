import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditContentPage } from './edit-content';

@NgModule({
  declarations: [
    EditContentPage,
  ],
  imports: [
    IonicPageModule.forChild(EditContentPage),
  ],
  exports: [
    EditContentPage
  ]
})
export class EditContentPageModule {}
