import {Injectable} from 'angular2/core';
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";


@Injectable()
export class FirebaseService {
    fbauth : boolean;
    baseRef = new Firebase('https://community-app.firebaseio.com/');
    constructor() {
        var that = this;
        // check for changes in auth status
        this.baseRef.onAuth((authData) => {
            if (authData) {
                console.log("User " + authData.uid + " is logged in with " + authData.provider);
				that.fbauth = true;
            } else {
                console.log("User is logged out");
                that.fbauth = false;
            }
        })
    }

    logout() {
        this.baseRef.unauth()
    }
/*	createUser(_username) {
        var that = this

        return new Observable(observer => {
            that.baseRef.createUser({
                "email": _username,
                "password": "password"
            }, function(error, authData) {
                if (error) {
                    console.log("Login Failed!", error);
                    observer.error(error)
                } else {
                    console.log("Authenticated successfully with payload-", authData);
                    observer.next(authData)
						var usersRef = that.baseRef.child("users");
                }
            });
        });
    }*/
	signup(credits){
	var that = this;
	

   
	   return new Observable(observer => {
			this.baseRef.createUser({
  email    : credits.username,
  password : credits.password
}, function(error, userData) {


  if (error) {
    console.log("Error creating user:", error);
	alert(error);
	 observer.error(error);
	 
  } else {
    console.log("Successfully created user account with uid:", userData.uid);
	 observer.next(userData.uid)
	 var uid = userData.uid;
	// that.authSuccess(userData.token);
	var usersRef = that.baseRef.child("users");
			usersRef.child(uid).set({
				name: credits.name,
				email: credits.username,
				phone: credits.phone,
				community: credits.community
			});
  }
  });
});
}
    login(_username,password) {
        var that = this

        return new Observable(observer => {
            that.baseRef.authWithPassword({
                "email": _username,
                "password": password
            }, function(error, authData) {
                if (error) {
                    console.log("Login Failed!", error);
                    observer.error(error)
                } else {
                    console.log("Authenticated successfully with payload-", authData);
                    observer.next(authData)
                }
            });
        });
    }

    getDataPrivate(_id, _callback) {
        var ref = this.baseRef.child('public-messages')
        ref = ref.child(_id)

        ref.on('value',
            (snapshot) => {
                let result = snapshot.val()
                _callback(result)
            },
            (error) => {
                console.log("ERROR:", error)
                _callback(error)
            });
    }


    getData(_id, _callback) {
        var ref = this.baseRef.child('bookItems')
        //  ref = ref.child(_id)

        ref.on('value',
            (snapshot) => {
                var arr = []

                snapshot.forEach(function(childSnapshot) {
                    arr.push({
                        id: childSnapshot.key(),
                        data: childSnapshot.val()
                    });
                });
                _callback(arr)
            },
            (error) => {
                console.log("ERROR:", error)
                _callback(error)
            });
    }

    getDataObs(_id) {
        var ref = this.baseRef.child('bookItems')
        //  ref = ref.child(_id)
        var that = this

        return new Observable(observer => {
            ref.on('value',
                (snapshot) => {
                    var arr = []

                    snapshot.forEach(function(childSnapshot) {
                        arr.push({
                            id: childSnapshot.key(),
                            data: childSnapshot.val()
                        });
                    });
                    observer.next(arr)
                },
                (error) => {
                    console.log("ERROR:", error)
                    observer.error(error)
                });
        });
    }


}

