import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { IntroPage } from '../pages/intro/intro';
import { Signup2Page } from '../pages/signup2/signup2';
import { NotificationsPage } from '../pages/notifications/notifications';
import { FinancesPage } from '../pages/finances/finances';
import { ProfilePage } from '../pages/profile/profile';
import { SignupClient1Page } from '../pages/signup-client1/signup-client1';
import { SignupDesigner1Page } from '../pages/signup-designer1/signup-designer1';
import { CreateProject1Page } from '../pages/create-project1/create-project1';
import {SettingsPage} from '../pages/settings/settings';
import {MessagingPage} from '../pages/messaging/messaging';
import {HelpPage} from '../pages/help/help';
import {ChatPage} from '../pages/chat/chat';
//

import {AuthProvider} from '../providers/auth/auth'

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  user: String;
  pages: Array<{title: string, component: any, icon: string}>;

  constructor(public platform: Platform,afAuth: AngularFireAuth, public statusBar: StatusBar, public splashScreen: SplashScreen,
  public authProvider: AuthProvider) {
    this.initializeApp();

    //authentication subscribe function
    const authObserver = afAuth.authState.subscribe( user => {
      if (user) {
        this.rootPage = HomePage;
        authObserver.unsubscribe();
      } else {
        this.rootPage = IntroPage;
        authObserver.unsubscribe();
      }
    });

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage, icon: 'home' },
      // { title: 'Notifications', component: NotificationsPage, icon: 'notifications' },
      // { title: 'Messaging', component: MessagingPage,  icon: 'mail' },
      // { title: 'Settings', component: SettingsPage, icon: 'settings' },
      // { title: 'Profile', component: ProfilePage,  icon: 'person' },
  
  //       { title: 'DChat', component: ChatPage,  icon: 'cash' },
     //  { title: 'Create Project', component: CreateProject1Page,  icon: 'cash' },
      //  { title: 'Help', component: HelpPage,  icon: 'help' },
      // { title: 'Qtn', component: DesignerQtnPage,  icon: 'help' },
      
    ];
    this.user = ".";
    

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page:any) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout(){
    this.authProvider.logoutUser();
    this.nav.setRoot(IntroPage);
    
  }
}
