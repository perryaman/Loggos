import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddDesignerToProjectPage } from './add-designer-to-project';

@NgModule({
  declarations: [
    AddDesignerToProjectPage,
  ],
  imports: [
    IonicPageModule.forChild(AddDesignerToProjectPage),
  ],
  exports: [
    AddDesignerToProjectPage
  ]
})
export class AddDesignerToProjectPageModule {}
