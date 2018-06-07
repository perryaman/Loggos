import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ProjectPage} from '../project/project';
import {NotificationsPage} from '../notifications/notifications';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import {FirebaseAuth} from 'firebase/auth';
import * as firebase from 'firebase/app';
import {SignupClient1Page} from '../signup-client1/signup-client1';
import {SignupDesigner1Page} from '../signup-designer1/signup-designer1';
import {CreateProject1Page} from '../create-project1/create-project1';
import {ProjectsPage} from '../projects/projects';
import {MessagingPage} from '../messaging/messaging';
import {HelpPage} from '../help/help';
import {OffersAndDiscountsPage} from '../offers-and-discounts/offers-and-discounts';
import {FeaturedContentPage} from '../featured-content/featured-content';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    projectPage = ProjectPage;
    projectsPage = ProjectsPage;
    notificationsPage = NotificationsPage;
    messagingPage = MessagingPage;
    helpPage = HelpPage;
    offersPage = OffersAndDiscountsPage;
    //get  logged in user
    user =  firebase.auth().currentUser;    
    userInfo : FirebaseObjectObservable<any>;
    userSnap : any;
    //  userId = 2;
    projects : FirebaseListObservable<any>;
    projects2 : FirebaseListObservable<any>;
    activities : FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public db:AngularFireDatabase, auth: AngularFireAuth) {
    //
    this.checkRegistrationComplete();

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

  openProjectPage(id:any){
    this.navCtrl.push(ProjectPage, {'projectId': id });
  }
  
  openAllProjects(){
    this.navCtrl.push(ProjectsPage);
  }

  openOffers(){
    this.navCtrl.push(OffersAndDiscountsPage);
  }

  openContents(){
    this.navCtrl.push(FeaturedContentPage);
  }

  getActivities(db:any, projects:any){
    //get a list of activities that have happend recently
    //activity is any action taken on a project and is recorded
    //foreach project the user has, use the project id to get the recent activities
    this.projects.forEach(element => {
      this.activities.push(
        db.list('https://loggos-baaab.firebaseio.com/activities/'+element.id)
        );  
    });

  }

  getMessages(db:any){
        db.list('https://loggos-baaab.firebaseio.com/messages/'+this.user.uid)
  }

  getNotifications(db:any){
    //get a list of notifications the user has
    //notification is any action taken on a project and is recorded
    this.notifications = db.list('https://loggos-baaab.firebaseio.com/notifications/'+this.user.uid);
    
  }



  notifications(){
         this.navCtrl.setRoot('notifications');
  }

  checkRegistrationComplete(){
      //check if user finished reg, if not redirect to where he stopped

      this.db.object('users/'+this.user.uid).$ref.on('value', userSnap =>{
        //Check if the user completed his profile registration
        if(!userSnap.val().name){  
          //the user didn't complete reg
          //check their role and redirect accordingly
          if(userSnap.val().role == 'client'){
            this.navCtrl.setRoot(SignupClient1Page);                  
          } else if(userSnap.val().role == 'designer'){
            this.navCtrl.setRoot(SignupDesigner1Page);                            
          }
        } 
        // else if(userSnap.val().role=='client' && userSnap.val().name && !userSnap.val().company){ //user is a client, is registered but didn't register company
        //     this.navCtrl.setRoot(CreateProject1Page);                              
        // } else if(userSnap.val().role=='client' && userSnap.val().name && userSnap.val().company && !userSnap.val().project){ //user is a client, is registered but has no project
        //     this.navCtrl.setRoot(CreateProject1Page);                              
        // }
      });

  }
  getAllProjects(){

  }
  

}
