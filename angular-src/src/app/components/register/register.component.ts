import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service'
import {AuthService} from '../../services/auth.service'
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
import {UserClass} from '../../../../../models/User';
import {AccordionModule} from 'primeng/primeng';     
import {MenuItem} from 'primeng/primeng';            
import {DataTableModule,SharedModule, SelectItem, Message} from 'primeng/primeng';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {    
    displayDialog: boolean;
    user: UserClass 
    selectedUser: UserClass;
    plusUser: boolean;
    users: UserClass[];
    msgs: Message[]=[];
    items: MenuItem[];

    
    
    

  constructor(    
    private validateService: ValidateService,
    private flashMessage:FlashMessagesService,
    private authService:AuthService,
    private router: Router) {
    
     }

  ngOnInit() {
        this.authService.getUser().subscribe(users => {
      this.users = users;
    });  
 }


      onRegisterSubmit()
      { 
        const register = {
          email: this.user.email,
          password: this.user.password,
          username: this.user.username
        };

        console.log(register);
        
        var emailChecker=this.checkEmail(register.email);
        var usernameChecker=this.checkUsername(register.username);
              if(emailChecker === true && usernameChecker === true){
        
                                this.authService.addUser(register).subscribe(data => {
                                if(data.success){
                              this.flashMessage.show('User registered ', {cssClass: 'alert-success', timeout: 3000});
                              this.router.navigate(['/profile']);
                                 this.user=null;
                                 this.displayDialog=false;
                              } else {             
                              
                              }
                              this.ngOnInit();
                                    });          
              } else if(emailChecker === false){
                  this.msgs = [];
                  this.msgs.push({severity: 'error', summary: 'Registration Error', detail:'Invalid email'});
              } else if(usernameChecker === false){
                  this.msgs = [];
                  this.msgs.push({severity: 'error', summary: 'Registration Error', detail:'Duplicate Username'});
              }             

    }



    checkEmail(email)
    {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
  
    checkEmpty(){
      if(this.user.email && this.user.username && this.user.password){
        document.getElementById("saveUser").removeAttribute("disabled"); 
      }

    }

    checkUsername(username){
          for(var i = 0;i < this.users.length;i++)
           {
             if(this.users[i].username == username)
             {
                return false;
             }
           } 
           return true;
    }
    
}

