import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {ProjectPage} from '../project/project';
import { AngularFireAuth } from 'angularfire2/auth';
import {FirebaseAuth} from 'firebase/auth';
import * as firebase from 'firebase/app';
import {CreateProject1Page} from '../create-project1/create-project1';

/**
 * Generated class for the ProjectsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-projects',
  templateUrl: 'projects.html',
})
export class ProjectsPage {
    projects : FirebaseListObservable<any>;
     //get  logged in user
    user =  firebase.auth().currentUser;    
    userInfo : FirebaseObjectObservable<any>;
    userSnap : any;
    //  userId = 2;
    projects2 : FirebaseListObservable<any>;
    activities : FirebaseListObservable<any>;


  constructor(public navCtrl: NavController, public navParams: NavParams,public db:AngularFireDatabase, ) {
      //Get the user properties
    this.userInfo = db.object('users/'+this.user.uid);
    
    //Get the projects the user is involved in
    this.getProjects();
  
  }
   getProjects(){

    //get list of projects the user has by whatever role they have 
    //we need to get the user role first so we use a join
    this.db.object('users/'+this.user.uid).$ref.on('value', userSnap =>{
      this.userSnap = userSnap;
      if(userSnap.val().role == 'client'){      
        this.projects = this.db.list('projects/',{
          query:{
            orderByChild: 'client',
            equalTo: this.user.uid,
          }
      });
      console.log(this.projects);
    } else if(userSnap.val().role == 'designer'){
        this.projects = this.db.list('projects/',{
          query:{
            orderByChild: 'designer',
            equalTo: this.user.uid,
          }
        });
    } else if(userSnap.val().role =='strategist'){
        this.projects = this.db.list('projects/',{
          query:{
            limitToFirst: 5,
          }
        });

        
    }
  }) 
  //  return this.projects;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectsPage');
  }
  openProjectPage(id:any){
    this.navCtrl.push(ProjectPage, {'projectId': id });
  }
createNewProject(){
    this.navCtrl.push(CreateProject1Page);
  }

}
