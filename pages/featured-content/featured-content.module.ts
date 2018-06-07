import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FeaturedContentPage } from './featured-content';

@NgModule({
  declarations: [
    FeaturedContentPage,
  ],
  imports: [
    IonicPageModule.forChild(FeaturedContentPage),
  ],
  exports: [
    FeaturedContentPage
  ]
})
export class FeaturedContentPageModule {}
