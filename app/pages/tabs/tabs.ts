import {Page,IonicApp,NavController} from 'ionic-angular';
import {PingPage} from '../ping/ping';
import {ProfilePage} from '../profile/profile';

import {MyaccountPage} from '../myaccount/myaccount';
import {NotificationsPage} from '../notifications/notifications';
import {Type} from '@angular/core';

import {AuthService} from '../../services/auth/auth';

@Page({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  pingPage: Type = PingPage;
  profilePage: Type = ProfilePage;

  pages: Array<{title: string, component: any}>;
	myaccountPage: Type = MyaccountPage;
  constructor(private app: IonicApp,private auth: AuthService, private nav: NavController) {
       this.pages = [
           { title: 'My Account', component: MyaccountPage },
			{ title: 'Notifications', component: NotificationsPage }
		];
      
  }
   openPage(page) {
    
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
 //   let nav = this.app.getComponent('nav');
 //   nav.setRoot(page.component);
        this.nav.push(page.component);
  } 
  
}
