import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private afAuth: AngularFireAuth,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  public showAlert = false;

  onSubmit() {
    if(this.loginForm.valid) {
      let loginvalue = this.loginForm.value;
      this.auth.loginEmailPass(loginvalue);
    } else {
      this.showAlert = true;
      setTimeout(() => {
        this.showAlert = false}, 3000);
    }
  }

}
