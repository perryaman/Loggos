import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as firebase from 'firebase/app';

import { Camera, CameraOptions } from '@ionic-native/camera';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

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

   public isClient = false;
   public isStrategist = false;
   public loading:Loading;
   stage : FirebaseObjectObservable<any>;
   deliverables : FirebaseListObservable<any>;
   comments : any;
   stageId: String;
   projectId: String;
   userProfile: any;
   commentForm: FormGroup;
   commently: any;
   
   constructor(
     public afAuth: AngularFireAuth,
     public navCtrl: NavController, 
     public navParams: NavParams, 
     public db: AngularFireDatabase,
     public formBuilder: FormBuilder, 
     public toastCtrl: ToastController,
     public camera: Camera,
     public loadingCtrl: LoadingController,
     private transfer: FileTransfer, 
     private file: File) {


     //Get the current user
     this.db.object('users/'+this.afAuth.auth.currentUser.uid).$ref.once('value',
       userSnap=>{

        //Hide "Add deliverable" if the user is a client
        if(userSnap.val().role == 'client'){
          this.isClient = true;
        }else if(userSnap.val().role == 'strategist'){
          this.isStategist = true;
        }

      });


     this.commentForm = formBuilder.group({
       comment: ['', Validators.compose([Validators.minLength(6), Validators.required])],      
     });

    //get the stage info from navParams
    this.projectId = navParams.get('projectId');
    this.stageId = navParams.get('stageId');

    //Get the stage deliverables
    this.deliverables = this.db.list('stages/'+this.projectId+'/'+this.stageId+'/deliverables');

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

}

  //Function to add new deliverables
  addDeliverable(){

    //Select and upload photo
    this.selectPhoto();

  }

  private selectPhoto(): void {

    const options: CameraOptions = {
      quality: 50,
      sourceType:this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      mediaType: this.camera.MediaType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      targetWidth:500,
      targetHeight:500,
      correctOrientation:true
    }


    this.camera.getPicture(options).then(imageData => {

      let fileName = imageData.substr(imageData.lastIndexOf('/')+1);

      let fileExtension = imageData.substr(fileName.lastIndexOf('.')+1);

      this.uploadPhoto(imageData,fileName,fileExtension);


    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
    });
  }

  private uploadPhoto(imageData:any,fileName:any,fileExtension:any): void {

    //Display the loader
    this.loading = this.loadingCtrl.create({
      dismissOnPageChange: true,
    });
    this.loading.present();

    //Resolve file type
    let type;

    if(fileExtension.toString().toLowerCase() == 'jpg' ||
      fileExtension.toString().toLowerCase() == 'png' ||
      fileExtension.toString().toLowerCase() == 'jpeg' 
      ){

      type = 'image';

  }else{

    type = 'file';

  }

  firebase.storage().ref('deliverables/')
  .child(fileName)
  .putString(imageData , 'base64', {contentType: 'image/png'})
  .then((savedPicture) => {

        //Save deliverables in the database
        this.db.list('stages/'+this.projectId+'/'+this.stageId+'/deliverables')
        .push({
          type:type,
          url:savedPicture.downloadURL,
          name:fileName,
          date:Date(),
          active:false
        }).then((snap)=>{

          this.loading.dismiss();

          const toast = this.toastCtrl.create({
            message: 'Deliverable uploaded',
            duration: 3000
          });
          toast.present();


        });




      });

}


  //Validate a deliverable for the user to view
  validateDeliverable(deliverable:any){

    //Display the loader
    this.loading = this.loadingCtrl.create({
      dismissOnPageChange: true,
    });
    this.loading.present();

    this.db.object('stages/'+this.projectId+'/'+this.stageId+'/deliverables/'+deliverable.$key).update({
      active:true
    }).then((snap)=>{

      this.loading.dismiss();

      const toast = this.toastCtrl.create({
        message: 'Deliverable Validated',
        duration: 3000
      });
      toast.present();

    });

  }

  //Download deliverable image
  downloadFile(deliverable:any){

    //Display the loader
    this.loading = this.loadingCtrl.create({
      dismissOnPageChange: true,
    });
    this.loading.present();

    const fileTransfer: FileTransferObject = this.transfer.create();

    const url = deliverable.url;
    fileTransfer.download(url, cordova.file.externalRootDirectory+"/Loggos/"+ deliverable.name+'file.png').then((entry) => {

      this.loading.dismiss();

      const toast = this.toastCtrl.create({
        message: 'File downloaded' ,
        duration: 3000
      });
      toast.present();

    }, (error) => {
    
      this.loading.dismiss();

      const toast = this.toastCtrl.create({
        message: 'An error occured, try again.',
        duration: 3000
      });
      toast.present();

    });

  }




}
