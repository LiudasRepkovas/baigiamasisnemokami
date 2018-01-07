import {Component, OnInit, NgZone} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import {FacebookService, LoginOptions} from 'ngx-facebook';

import { Meteor } from 'meteor/meteor';
import * as _ from 'lodash';


import template from './login.component.web.html';
import style from './login.component.scss';

@Component({
  selector: 'login',
  styles: [style],
  template
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error: string;

  constructor(private router: Router, private zone: NgZone, private formBuilder: FormBuilder, public fb: FacebookService) {
    
       let initParams: InitParams = {
         appId: '360039191135807',
         xfbml: true,
         version: 'v2.11'
       };
    
       this.fb.init(initParams);
    
    }
    

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.error = '';
  }

  login() {
    if (this.loginForm.valid) {
      Meteor.loginWithPassword(this.loginForm.value.email, this.loginForm.value.password, (err) => {
        if (err) {
          this.zone.run(() => {
            this.error = err;
          });
        } else {
          this.router.navigate(['/']);
        }
      });
    }
  }

  loginWithFacebook(e:any){
    e.preventDefault();
    let options: LoginOptions = {
      enable_profile_selector: true,
      scope: 'public_profile,email'
    };

    let fb_data = {};

    this.fb.login(options).then((login_result) => {
      if(!login_result) {
        return Promise.reject('Login cancelled');
      }
      let accessToken = login_result.authResponse.accessToken;
      let expiresIn = login_result.authResponse.expiresIn;
      fb_data['accessToken'] = accessToken;
      fb_data['expiresAt'] = _.now() + expiresIn;

      Accounts.callLoginMethod({
        methodArguments: [{facebookWebLoginData: fb_data}],
        userCallback: (error) => {
          if(!error) {
            // this.toastr.success('Logged in!');
            this.router.navigate(['/']);
          } else if(error.error == 'NoAccountOrEmail') {
            // this.params.setData({facebook: fb_data});
            this.router.navigate(['/register']);
          } else {
            console.log(error);
            // this.toastr.error('Could not log in');
          }
          // this.loggingInFb = false;
        }
      });
      // return this.fb.api('/me', 'get', {fields: 'email, id, first_name, last_name, picture.width(500)'});
    }).catch((error) => {
      console.log(error);
      // this.toastr.error('Error');
      // this.loggingInFb = false;
    });
    // Meteor.loginWithFacebook({requestPermissions: ['public_profile', 'email']}, ()=>{
    //   this.router.navigate(['/']);
    // })
  }
}