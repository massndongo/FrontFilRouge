import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../parametres/auth.service';
import jwt_decode from 'jwt-decode';
import { JWTTokenService } from '../parametres/jwt-helper.service';
import { subscribeOn } from 'rxjs/operators';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  loginForm: FormGroup;
  isSubmitted = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private jwtService: JWTTokenService
    ) { }

  public localStorage  = window.localStorage;


  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get formControls(){
    return this.loginForm.controls;
  }
  role: string;
  message: string;

  seConnecter(){
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login(this.formControls.username.value,this.formControls.password.value).subscribe(
      data => {
        console.log('token: '+data.token)
        this.jwtService.setToken(data.token)
        this.localStorage.getItem('token') ? jwt_decode(this.localStorage.getItem('token')) : null
        



        console.log('Expire: '+this.jwtService.isTokenExpired())
      },
      error => {
        if (error.status === 401) {
          this.message = 'Username ou Password incorrect.'
        }
         console.log('message: '+error.error.message+' code: '+error.error.code);

      }
    );
  }


}
