import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FinancesPage } from './finances';

@NgModule({
  declarations: [
    FinancesPage,
  ],
  imports: [
    IonicPageModule.forChild(FinancesPage),
  ],
  exports: [
    FinancesPage
  ]
})
export class FinancesPageModule {}
