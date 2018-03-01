import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController,ViewController } from 'ionic-angular';
import { ProjectStagePage } from '../project-stage/project-stage';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import { AddDesignerToProjectPage } from '../add-designer-to-project/add-designer-to-project';
import { AddStrategistToProjectPage } from '../add-strategist-to-project/add-strategist-to-project';
import { AddCopywriterToProjectPage } from '../add-copywriter-to-project/add-copywriter-to-project';
import{ProfilePage} from '../profile/profile';
import * as firebase from 'firebase/app';

/**
 * Generated class for the ProjectPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-project',
  templateUrl: 'project.html',
})
export class ProjectPage {
  projectId: String;
  projectStages : FirebaseListObservable<any>;
  stages : FirebaseListObservable<any>;
  project: FirebaseObjectObservable<any>;
  user: FirebaseObjectObservable<any>;
  projectInfo = {
    designer:null,
    strategist: null,
    company: null,
    copywriter: null,
    client: null 
    };
  projectStagePage = ProjectStagePage; 
  constructor(public navCtrl: NavController, public navParams: NavParams, public db:AngularFireDatabase,
  public modalCtrl: ModalController, public viewCtrl: ViewController) {
    //Get user details
    this.user = db.object('users/'+firebase.auth().currentUser.uid);

    //Get project ID from navParams
    this.projectId = navParams.get('projectId');
 
    //fetch the project stages from DB
    this.stages = this.getStages(this.projectId);

    //Get the project info from DB
    this.db.object('projects/'+this.projectId).subscribe(data =>{
      this.project = data;

     //Get the readables for project data
      if(data.designer){
        this.db.object('users/'+data.designer+"/name").$ref.once('value',name=>{
          this.projectInfo.designer = name.val();
        })
      }
      if(data.company){
        this.db.object('companies/'+data.company+"/name").$ref.once('value',name=>{
          this.projectInfo.client = name.val();
        })
      }
      if(data.client){
        this.db.object('users/'+data.client+"/name").$ref.once('value',name=>{
          this.projectInfo.company = name.val();
        })
      }
      if(data.copywriter){
        this.db.object('users/'+data.copywriter+"/name").$ref.once('value',name=>{
          this.projectInfo.copywriter = name.val();
        })
      }
      if(data.strategist){
        this.db.object('users/'+data.strategist+"/name").$ref.once('value',name=>{
          this.projectInfo.strategist = name.val();
        })
      }      
      
    });
 
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectPage');
  }
  
  getStages(id:any){
    return this.db.list('stages/'+id);
  } 

  openProjectStagePage(stageId:any){
        this.navCtrl.push(ProjectStagePage, {
          'projectId':this.projectId,
          'stageId': stageId
        });
  }

  quickViewProfile(designerId:any){
      this.navCtrl.push(ProfilePage, {'userId':designerId })
  }

  addDesigner(){
    //create a modal for the user to select a designer
     let modal = this.modalCtrl.create(AddDesignerToProjectPage, {'projectId':this.projectId});
      modal.present();
      //mm
  }
  addCopywriter(){
    //create a modal for the user to select a designer
     let modal = this.modalCtrl.create(AddCopywriterToProjectPage, {'projectId':this.projectId});
      modal.present();
  }
 addStrategist(){
    //create a modal for the user to select a designer
     let modal = this.modalCtrl.create(AddStrategistToProjectPage, {'projectId':this.projectId});
      modal.present();
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }

}
