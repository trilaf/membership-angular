import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '../../core/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User = {
    displayName: this.afAuth.auth.currentUser.displayName,
    email: this.afAuth.auth.currentUser.email,
    emailVerified: this.afAuth.auth.currentUser.emailVerified,
    photoURL: this.afAuth.auth.currentUser.photoURL,
    stringEmailVerified: "Null"
  }

  constructor(
    private rtr: Router,
    private auth: AuthService,
    private afAuth: AngularFireAuth
  ) { }

  ngOnInit() {
    console.log("init list");
    if(this.user.emailVerified == true) {
      this.user.stringEmailVerified = "Verified"
    } else {
      this.user.stringEmailVerified = "Not Verified"
    }
  }

}
