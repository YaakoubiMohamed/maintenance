import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../shared/services/authentication.service';
import { first } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { JarwisService } from '../shared/services/jarwis.service';
import { TokenService } from '../shared/services/token.service';
import { AuthService } from '../shared/services/auth.service';
import { MustMatch } from '../_helpers/must-match.validator';
import { FormBuilder, FormControl,  FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  registerForm: FormGroup;
  submitted = false;
  userEmails = new FormGroup({
    email: new FormControl('',[
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
    password: new FormControl('',[
      Validators.required,
      Validators.minLength(6)]),
    }); 

    error:any;
    constructor(private formBuilder: FormBuilder,
      private Jarwis: JarwisService,
    private Token: TokenService,
    private router: Router,
    private Auth: AuthService) { }

    ngOnInit() {
      
    }
    get email(){
      return this.userEmails.get('email')
      }
      onSubmit() {
        this.submitted =true;
        this.Jarwis.login(this.userEmails.value).subscribe(
          data => this.handleResponse(data),
          error => this.handleError(error)
        );/*
        this.Jarwis.login(this.form).subscribe(data => {
          localStorage.setItem('user', JSON.stringify(data));
          this.Auth.meInfo(data['token']).subscribe(response => {
            let user = JSON.parse(localStorage.getItem('user'));
            user.user = response;
            localStorage.setItem('user', JSON.stringify(user));
            this.router.navigate(['profile'])
          })
        });
        */
      }
    
      handleResponse(data) {
        this.Token.handle(data);
        console.log(data.user);
        localStorage.setItem('user', JSON.stringify(data));
        this.Auth.changeAuthStatus(true);
        this.router.navigateByUrl('/home');
      }
    
      handleError(error) {
        this.error = error.error.error;
      }

  onReset() {
      this.submitted = false;
      this.registerForm.reset();
  }

    
}
