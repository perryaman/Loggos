import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as firebase from 'firebase/app';

/**
 * Generated class for the ProjectStagePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-project-stage',
  templateUrl: 'project-stage.html',
})
export class ProjectStagePage {
  stage : FirebaseObjectObservable<any>;
  deliverables : FirebaseListObservable<any>;
  comments : any;
  stageId: String;
  projectId: String;
  userProfile: any;
  commentForm: FormGroup;
  commently: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase,
  public formBuilder: FormBuilder, public toastCtrl: ToastController) {

    this.commentForm = formBuilder.group({
      comment: ['', Validators.compose([Validators.minLength(6), Validators.required])],      
    });

    //get the stage info from navParams
    this.projectId = navParams.get('projectId');
    this.stageId = navParams.get('stageId');

    //Get stage from DB 
    db.object('stages/'+this.projectId+'/'+this.stageId).subscribe(data =>{
      this.stage = data;
  });
        
    //Get username for posting comment
    db.object('users/'+firebase.auth().currentUser.uid).subscribe(data=>{
      this.userProfile = data;
    })

    //Get comments for this stage
    db.list('stages/'+this.projectId+'/'+this.stageId+'/comments')
    .map((commentsSnap:any)=>{
       let commentsRaw:any = [];
       commentsSnap.map( (commentSnap:any)=>{
          db.object('users/'+commentSnap.userId).$ref.once('value', (userSnap) =>{
            commentSnap.name = userSnap.val().name ? userSnap.val().name : userSnap.val().email;
            commentsRaw.push(commentSnap);
        })
      })
      return commentsRaw;
    })
    .subscribe(comments =>{
      this.comments = comments;
    console.log(this.comments);
      
    })

    //Get deliverables for this stage
    console.log(this.comments);

}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectStagePage');

  }
  getStage(){
    
  }
  saveComment(){
    if (!this.commentForm.valid){
      let toast = this.toastCtrl.create({
        message: 'Your comment must be at least 6 characters long. Please try again.',
        duration: 3000,
        position: 'middle'
      });
          toast.present();          
      
    } else {
     
    //Name
    //Timestamp
    //user id
    //Body

     this.db.list('stages/'+this.projectId+'/'+this.stageId+'/comments').push({
      'timestamp': Date(),
      'userId': firebase.auth().currentUser.uid,
      'body':this.commentForm.value.comment
    })
    .then(()=>{
          let toast = this.toastCtrl.create({
            message: 'Comment saved',
            duration: 2000,
            position: 'middle'
          });
          toast.present();          
      })
        
  }


  }}
