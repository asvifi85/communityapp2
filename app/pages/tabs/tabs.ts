import {Page} from 'ionic-angular';
import {PingPage} from '../ping/ping';
import {ProfilePage} from '../profile/profile';

import {MyaccountPage} from '../myaccount/myaccount';
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
	myaccountPage: Type = MyaccountPage;
  constructor(private auth: AuthService) {}
}
