var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
//importing AF2 and relevant modules
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { Facebook } from '@ionic-native/facebook';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { ListPage } from '../pages/list/list';
import { ProjectPage } from '../pages/project/project';
import { ProjectStagePage } from '../pages/project-stage/project-stage';
import { IntroPage } from '../pages/intro/intro';
import { Signup2Page } from '../pages/signup2/signup2';
import { NotificationsPage } from '../pages/notifications/notifications';
import { FinancesPage } from '../pages/finances/finances';
import { ProfilePage } from '../pages/profile/profile';
import { SignupClient1Page } from '../pages/signup-client1/signup-client1';
import { SignupClient2Page } from '../pages/signup-client2/signup-client2';
import { SignupStrategist1Page } from '../pages/signup-strategist1/signup-strategist1';
import { SignupDesigner1Page } from '../pages/signup-designer1/signup-designer1';
import { SignupDesigner2Page } from '../pages/signup-designer2/signup-designer2';
import { CreateProject1Page } from '../pages/create-project1/create-project1';
import { CreateProject2Page } from '../pages/create-project2/create-project2';
import { SettingsPage } from '../pages/settings/settings';
import { MessagingPage } from '../pages/messaging/messaging';
import { HelpPage } from '../pages/help/help';
import { AddDesignerToProjectPage } from '../pages/add-designer-to-project/add-designer-to-project';
import { AddStrategistToProjectPage } from '../pages/add-strategist-to-project/add-strategist-to-project';
import { AddCopywriterToProjectPage } from '../pages/add-copywriter-to-project/add-copywriter-to-project';
import { ChatPage } from '../pages/chat/chat';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UserComponent } from '../components/user/user';
import { AuthProvider } from '../providers/auth/auth';
import { ProfileProvider } from '../providers/profile/profile';
import { MessagingProvider } from '../providers/messaging/messaging';
import { ProjectsPage } from '../pages/projects/projects';
// AF2 Settings
export var firebaseConfig = {
    apiKey: "AIzaSyCLDbOhz9SYIGsuEghMGSU0DFGTQvWXA6A",
    authDomain: "loggos-baaab.firebaseapp.com",
    databaseURL: "https://loggos-baaab.firebaseio.com",
    projectId: "loggos-baaab",
    storageBucket: "loggos-baaab.appspot.com",
    messagingSenderId: "786429908308"
};
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    NgModule({
        declarations: [
            MyApp,
            HomePage,
            ListPage,
            ProjectPage,
            ProjectStagePage,
            UserComponent,
            IntroPage,
            SignupClient1Page,
            SignupClient2Page,
            SignupStrategist1Page,
            CreateProject1Page,
            CreateProject2Page,
            SignupDesigner1Page,
            SignupDesigner2Page,
            Signup2Page,
            NotificationsPage,
            FinancesPage,
            ProfilePage,
            SettingsPage,
            MessagingPage,
            HelpPage,
            AddDesignerToProjectPage,
            AddCopywriterToProjectPage,
            AddStrategistToProjectPage,
            ChatPage,
            ProjectsPage,
            LoginPage,
            SignupPage
        ],
        imports: [
            BrowserModule,
            IonicModule.forRoot(MyApp),
            AngularFireModule.initializeApp(firebaseConfig),
            AngularFireAuthModule,
            AngularFireDatabaseModule
        ],
        bootstrap: [IonicApp],
        entryComponents: [
            MyApp,
            HomePage,
            ProjectPage,
            ProjectStagePage,
            ListPage,
            IntroPage,
            SignupClient1Page,
            SignupClient2Page,
            CreateProject1Page,
            CreateProject2Page,
            SignupDesigner1Page,
            SignupDesigner2Page,
            Signup2Page,
            NotificationsPage,
            FinancesPage,
            ProfilePage,
            SettingsPage,
            MessagingPage,
            HelpPage,
            AddDesignerToProjectPage,
            AddCopywriterToProjectPage,
            AddStrategistToProjectPage,
            ChatPage,
            ProjectsPage,
            SignupStrategist1Page,
            LoginPage,
            SignupPage
        ],
        providers: [
            StatusBar,
            SplashScreen,
            { provide: ErrorHandler, useClass: IonicErrorHandler },
            AuthProvider,
            ProfileProvider,
            Facebook,
            MessagingProvider
        ]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map