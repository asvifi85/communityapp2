import {Page,Storage, LocalStorage, NavController} from 'ionic-angular';

/*
  Generated class for the MyaccountPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/myaccount/myaccount.html',
})
export class MyaccountPage {
  name: any;
  email: any;
  phone: any;
  community: any;
  images: Array<{src: String}>;
  
  local: Storage = new Storage(LocalStorage);
  constructor(public nav: NavController) {
		this.name = this.local.get('name');
		this.phone = this.local.get('phone');
		this.email = this.local.get('email');
		this.community = this.local.get('community');
		 this.images = [{src: 'img/speakers/puppy.jpg'}];
  }
  takePhoto() {
	
    this.platform.ready().then(() => {
      let options = {
        quality: 80,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: false,
        encodingType: Camera.EncodingType.JPEG,
        saveToPhotoAlbum: false
      };
      // https://github.com/apache/cordova-plugin-camera#module_camera.getPicture
	  if(navigator.camera)
      navigator.camera.getPicture(
        (data) => {
          let imagedata = "data:image/jpeg;base64," + data;
           this._zone.run(()=> this.images.unshift({
             src: imagedata
           }))
        }, (error) => {
          alert(error);
        }, options
      );
    });
  }
}
