import {Page,NavController} from 'ionic-angular';
import {Http} from '@angular/http';
import {AuthHttp} from 'angular2-jwt';
import {AuthService} from '../../services/auth/auth';
import {ProfilePage} from '../profile/profile';
import 'rxjs/add/operator/map';

@Page({
  templateUrl: 'build/pages/ping/ping.html',
})
export class PingPage {
  message: string;
  error: string;
  
  constructor(private http: Http, public nav: NavController,    private authHttp: AuthHttp, private auth: AuthService) {}
  
  ping() {
    // Change the endpoint up for
    // one that points to your own server.
    this.http.get('http://example.com/ping')
      .map(res => res.json())
      .subscribe(
        data => this.message = data,
        err => this.error = err
      );
  }
  
  securedPing() {
    // Here we use authHttp to make an authenticated
    // request to the server. Change the endpoint up for
    // one that points to your own server.
    this.authHttp.get('http://example.com/secured/ping')
      .map(res => res.json())
      .subscribe(
        data => this.message = data,
        err => this.error = err
      );
  }
  signup(credentials){
  	var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
 if (filter.test(credentials.username) == false) {
		alert('Please provide a valid email address');
		return false;
	}
	if(!credentials.username){
		alert('invalid username');
		return;
	}
	if(!credentials.password){
		alert('invalid username');
		return;
	}
	var signupstatus = this.auth.signup(credentials);
    alert(signupstatus);
    
    if(signupstatus){
             this.nav.setRoot(ProfilePage);
        
    }
  }
  
}
