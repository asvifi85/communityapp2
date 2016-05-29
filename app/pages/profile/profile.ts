import {App, IonicApp,Page, NavController} from 'ionic-angular';
import {AuthService} from '../../services/auth/auth';

import {PingPage} from '../../pages/ping/ping';

/*
  Generated class for the ProfilePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/profile/profile.html',
})
export class ProfilePage {
   title:string;
  constructor(private app: IonicApp,public nav: NavController,private auth: AuthService) {
  // alert(auth.authenticated());
	//	if(auth.authenticated())
        this.title = "Login";
  
  }
  openSignup(){
//tabTitle
 this.title = "Signup";
 this.nav.setRoot(PingPage);
  }
}
