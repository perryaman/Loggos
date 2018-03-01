import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IntroPage } from './intro';
import {HomePage} from '../home/home';
 
@NgModule({
  declarations: [
    IntroPage,
    HomePage
  ],
  imports: [
    IonicPageModule.forChild(IntroPage),
  ],
  entryComponents: [
    HomePage,
  ],
  exports: [
    IntroPage
  ]
})
export class IntroPageModule {}
