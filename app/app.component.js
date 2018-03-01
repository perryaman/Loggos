var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { IntroPage } from '../pages/intro/intro';
import { NotificationsPage } from '../pages/notifications/notifications';
import { ProfilePage } from '../pages/profile/profile';
import { SettingsPage } from '../pages/settings/settings';
import { MessagingPage } from '../pages/messaging/messaging';
import { HelpPage } from '../pages/help/help';
//
import { AuthProvider } from '../providers/auth/auth';
import { AngularFireAuth } from 'angularfire2/auth';
var MyApp = (function () {
    function MyApp(platform, afAuth, statusBar, splashScreen, authProvider) {
        var _this = this;
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.authProvider = authProvider;
        this.initializeApp();
        //authentication subscribe function
        var authObserver = afAuth.authState.subscribe(function (user) {
            if (user) {
                _this.rootPage = HomePage;
                authObserver.unsubscribe();
            }
            else {
                _this.rootPage = IntroPage;
                authObserver.unsubscribe();
            }
        });
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', component: HomePage, icon: 'home' },
            { title: 'Notifications', component: NotificationsPage, icon: 'notifications' },
            { title: 'Messaging', component: MessagingPage, icon: 'mail' },
            { title: 'Settings', component: SettingsPage, icon: 'settings' },
            { title: 'Profile', component: ProfilePage, icon: 'person' },
            //       { title: 'DChat', component: ChatPage,  icon: 'cash' },
            //  { title: 'Create Project', component: CreateProject1Page,  icon: 'cash' },
            { title: 'Help', component: HelpPage, icon: 'help' },
        ];
        this.user = ".";
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    MyApp.prototype.logout = function () {
        this.authProvider.logoutUser();
        this.nav.setRoot(IntroPage);
    };
    return MyApp;
}());
__decorate([
    ViewChild(Nav),
    __metadata("design:type", Nav)
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Component({
        templateUrl: 'app.html'
    }),
    __metadata("design:paramtypes", [Platform, AngularFireAuth, StatusBar, SplashScreen,
        AuthProvider])
], MyApp);
export { MyApp };
//# sourceMappingURL=app.component.js.map