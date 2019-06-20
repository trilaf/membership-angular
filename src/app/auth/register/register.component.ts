import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validator, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public showAlert = false;
  registerForm: FormGroup;
  afAuth: AngularFireAuth;

  constructor(
    private fb: FormBuilder,
    private rtr: Router,
    private auth: AuthService
    ) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async onSubmit() {
    if(this.registerForm.valid) {
      let valueForm = this.registerForm.value;
      await this.auth.regEmailPass(valueForm);
    } else {
      this.showAlert = true;
      setTimeout(() => {
        this.showAlert = false;
      }, 3000);
    }
  }

}
