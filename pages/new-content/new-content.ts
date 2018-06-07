import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import * as firebase from 'firebase/app';

import { Camera, CameraOptions } from '@ionic-native/camera';

import {FeaturedContentPage} from '../featured-content/featured-content';



/**
 * Generated class for the NewContentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
 @IonicPage()
 @Component({
 	selector: 'page-new-content',
 	templateUrl: 'new-content.html',
 })
 export class NewContentPage {

 	public form:FormGroup;
 	public loading:Loading;
 	public hasImage=false;
 	public images=[];

 	constructor(public navCtrl: NavController, 
 		public navParams: NavParams,
 		public toastCtrl: ToastController,
 		public formBuilder: FormBuilder,
 		public db:AngularFireDatabase,
 		public afAuth: AngularFireAuth,
 		public camera: Camera,
 		public loadingCtrl: LoadingController) {


 		this.form = this.formBuilder.group({
 			title:['',Validators.compose([Validators.minLength(1), Validators.required])],
 			description:['',Validators.compose([Validators.minLength(0)])]
 		});


 	}

 	ionViewDidLoad() {
 		console.log('ionViewDidLoad NewContentPage');
 	}


 	createContent(){

 		if(this.form.valid){

 			if(!this.hasImage){

 				this.Toast('You need to add at least one image');
 				return;
 			}

  		//Upload content to db
  		this.saveProject();

  	}else{

  		this.Toast('The title is empty');

  	}

  }

  public selectPhoto(): void {

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

    

    firebase.storage().ref('featuredContent/')
    .child(fileName)
    .putString(imageData , 'base64', {contentType: 'image/png'})
    .then((savedPicture) => {

    	this.hasImage = true; 	

    	this.images.push(savedPicture.downloadURL);

    	this.loading.dismiss();

    });

}

saveProject(){

		//Display the loader
		this.loading = this.loadingCtrl.create({
			dismissOnPageChange: true,
		});
		this.loading.present();

		//Save in the database
		this.db.list('featuredContent/')
		.push({
			title:this.form.value.title,
			description:this.form.value.description,
			images: this.images,
			date:Date(),
			active:true
		}).then((snap)=>{

			this.Toast('Project published');

			this.loading.dismiss();

      this.navCtrl.push(FeaturedContentPage);


		});


	}
	

	Toast(msg){

		const toast = this.toastCtrl.create({
			message: msg,
			duration: 3000
		});
		toast.present();

	}



}
