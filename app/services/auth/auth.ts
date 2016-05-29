import {App, IonicApp,Storage, LocalStorage} from 'ionic-angular';
import {AuthHttp, JwtHelper, tokenNotExpired} from 'angular2-jwt';
import {Injectable, NgZone} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {FirebaseService} from '../firebaseService';
// Avoid name not found warnings
declare var Auth0Lock: any;

@Injectable()
export class AuthService {
  jwtHelper: JwtHelper = new JwtHelper();
  lock = new Auth0Lock('{DyG9nCwIEofSy66QM3oo5xU6NFs3TmvT}', '{contoso.auth0.com}');
  local: Storage = new Storage(LocalStorage);
 // refreshSubscription: any;
  user: Object;
  zoneImpl: NgZone;
  authType: string = "login";
  
  constructor(private app: IonicApp,private authHttp: AuthHttp, zone: NgZone,private fbs: FirebaseService) {
    this.zoneImpl = zone;
    // Check if there is a profile saved in local storage
   // alert(this.authenticated());

  /*  this.local.get('profile').then(profile => {
      this.user = JSON.parse(profile);
    }).catch(error => {
      console.log(error);
    }); */
    
  }
  
  public authenticated() {
    // Check if there's an unexpired JWT
    return tokenNotExpired();
  }
  
  public login(loginParams) {
  
  var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
 if (filter.test(loginParams.username) == false) {
		alert('Please provide a valid email address');
		return false;
	}
  var that = this;
  var data  = {token:''};
  that.fbs.login(loginParams.username,loginParams.password)
  .subscribe(data => {
   that.authSuccess(data.token);
   that.user = "profile";
        // that.getNewJwt();
        // that.scheduleRefresh();
   //that.nav.push(ListPage);
    // that.nav.setRoot(ListPage);
  //  this.openPage();
  });
    // Show the Auth0 Lock widget
  /*  this.lock.show({
      authParams: {
        scope: 'openid offline_access',
        device: 'Mobile device'
      }
    }, (err, profile, token, accessToken, state, refreshToken) => {
      if (err) {
        alert(err.status);
        return;
      }
      // If authentication is successful, save the items
      // in local storage
      this.local.set('profile', JSON.stringify(profile));
      this.local.set('id_token', token);
      this.local.set('refresh_token', refreshToken);
      this.zoneImpl.run(() => this.user = profile);
      // Schedule a token refresh
      this.scheduleRefresh();
    });    */
  }
  public signup(credits){
  var that = this;
		this.fbs.signup(credits).subscribe((data: any) => {
			
	alert("Successfully created user account with uid:"+ data);
					that.local.set('name', credits.name);
					that.local.set('phone', credits.phone);
					that.local.set('community', credits.community);
					that.local.set('email', credits.username);
				});
        return true;
  
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    let nav = this.app.getComponent('nav');
    nav.setRoot(page.component);
  } 
 /* public logout() {
    this.local.remove('profile');
    this.local.remove('id_token');
    this.local.remove('refresh_token');
    this.zoneImpl.run(() => this.user = null);
    // Unschedule the token refresh
   // this.unscheduleRefresh();
  } */
  public logout() {
    this.local.remove('id_token');
    this.user = null;
	this.fbs.logout();
  }
  public scheduleRefresh() {
    // If the user is authenticated, use the token stream
    // provided by angular2-jwt and flatMap the token
    let source = this.authHttp.tokenStream.flatMap(
      token => {
        // The delay to generate in this case is the difference
        // between the expiry time and the issued at time
        let jwtIat = this.jwtHelper.decodeToken(token).iat;
        let jwtExp = this.jwtHelper.decodeToken(token).exp;
        let iat = new Date(0);
        let exp = new Date(0);
        
        let delay = (exp.setUTCSeconds(jwtExp) - iat.setUTCSeconds(jwtIat));
        
        return Observable.interval(delay);
      });
     
  /*  this.refreshSubscription = source.subscribe(() => {
      this.getNewJwt();
    }); */
  }
  
  public startupTokenRefresh() {
    // If the user is authenticated, use the token stream
    // provided by angular2-jwt and flatMap the token
    if (this.authenticated()) {
      let source = this.authHttp.tokenStream.flatMap(
        token => {
          // Get the expiry time to generate
          // a delay in milliseconds
          let now: number = new Date().valueOf();
          let jwtExp: number = this.jwtHelper.decodeToken(token).exp;
          let exp: Date = new Date(0);
          exp.setUTCSeconds(jwtExp);
          let delay: number = exp.valueOf() - now;
          
          // Use the delay in a timer to
          // run the refresh at the proper time
          return Observable.timer(delay);
        });
      
       // Once the delay time from above is
       // reached, get a new JWT and schedule
       // additional refreshes
       source.subscribe(() => {
         this.getNewJwt();
         this.scheduleRefresh();
       });
    }
  }
 /* 
  public unscheduleRefresh() {
    // Unsubscribe fromt the refresh
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  } */
  
  public getNewJwt() {
    // Get a new JWT from Auth0 using the refresh token saved
    // in local storage
    this.local.get('refresh_token').then(token => {
      this.lock.getClient().refreshToken(token, (err, delegationRequest) => {
        if (err) {
          alert(err);
        }
        this.local.set('id_token', delegationRequest.id_token);
      });
    }).catch(error => {
      console.log(error);
    });
    
  }
  authSuccess(token:any) {
   // this.error = null;
    this.local.set('id_token', token);
    this.user = this.jwtHelper.decodeToken(token).username;
  }
}
