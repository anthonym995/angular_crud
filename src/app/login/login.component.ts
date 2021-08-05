import { Router} from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: any;
  password: any;
  constructor(private router: Router) { }

  ngOnInit(): void {

  }
  onLogin(){
     this.username= document.getElementById("username");
     this.password= document.getElementById("password");

    if(this.username.value == "admin" && this.password.value =="admin")
    {
    alert("login succesfully");
    this.router.navigateByUrl('dashboard');
    }
    else
    {
        alert("login failed");
    }
  }
 

}
