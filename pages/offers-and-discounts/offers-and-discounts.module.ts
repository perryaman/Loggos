import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OffersAndDiscountsPage } from './offers-and-discounts';

@NgModule({
  declarations: [
    OffersAndDiscountsPage,
  ],
  imports: [
    IonicPageModule.forChild(OffersAndDiscountsPage),
  ],
  exports: [
    OffersAndDiscountsPage
  ]
})
export class OffersAndDiscountsPageModule {}
