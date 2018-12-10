import { Component, OnInit,Input} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
 
})
export class ProfileComponent implements OnInit {

  user:Object;
  _id: String;
  role:String;
  email:String;
  showForum: boolean = false;
  users: Object[];
  errorMessage: any;

  constructor(private authService:AuthService, private router:Router, private flashMessage:FlashMessagesService) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.username;
      this._id = profile.user._id;
      this.email= profile.user.email;
     

    },
    err => {
      
      return false;
    });
    


  }

  changePassword(currentPass, newPass, confirmNewPass){

    if(newPass == confirmNewPass){
      this.authService.changePassword(this.user, currentPass, newPass).subscribe(data => {
      if(data.success){
        this.flashMessage.show('Password Successfully Changed', {
          cssClass: 'alert-success',
          timeout: 5000});
          (<HTMLInputElement>document.getElementById("password1")).value = "";
          (<HTMLInputElement>document.getElementById("password2")).value = "";
          (<HTMLInputElement>document.getElementById("password3")).value = "";
          
          this.authService.getProfile().subscribe(profile => {
          this.user = profile.user;
          });

      } else {
        this.flashMessage.show(data.msg, {
          cssClass: 'alert-danger',
          timeout: 4000});
      }
    });
    }
    else{
      this.flashMessage.show('New Password Must Match', {
          cssClass: 'alert-danger',
          timeout: 3000});
    }
    
    
  }


}
