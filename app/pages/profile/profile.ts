import {Page, NavController} from 'ionic-angular';
import {AuthService} from '../../services/auth/auth';

/*
  Generated class for the ProfilePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/profile/profile.html',
})
export class ProfilePage {
  constructor(public nav: NavController,private auth: AuthService) {
  // alert(auth.authenticated());
	//	if(auth.authenticated())
	//this.openPage(ListPage);
  
  }
 /* 
   openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    let nav = this.app.getComponent('nav');
    nav.setRoot(page.component);
  } */
}
