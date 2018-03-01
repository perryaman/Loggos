import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProjectStagePage } from './project-stage';

@NgModule({
  declarations: [
    ProjectStagePage,
  ],
  imports: [
    IonicPageModule.forChild(ProjectStagePage),
  ],
  exports: [
    ProjectStagePage
  ]
})
export class ProjectStagePageModule {}
