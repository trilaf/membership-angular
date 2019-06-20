import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { UsersListComponent } from '../user/users-list/users-list.component';

export interface User {
  uid?: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  favoriteColor?: string;
  phoneNumber?: string;
  emailVerified?: boolean;
  stringEmailVerified?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if(user) {
          return this.afs.doc<User>('users/' + user.uid).valueChanges()
        } else {
          return of(null)
        }
      })
    )
  }

  async fbLogin() {
    const provider = new auth.FacebookAuthProvider();
    await this.afAuth.auth.signInWithPopup(provider)
    .then((result) => {
    return this.updateUserData(result.user)
    })
    .catch((error) => {
      alert(error)
    })
  }

  async googleLogin() {
    const provider = new auth.GoogleAuthProvider();
    await this.afAuth.auth.signInWithPopup(provider)
    .then((result) => {
      return this.updateUserData(result.user)
      })
      .catch((error) => {
        alert(error)
      })
  }

  updateUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc('users/' + user.uid);
    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      phoneNumber: user.phoneNumber
    }
    return userRef.set(data, {merge: true}).then(() => {
      this.ngZone.run(() => this.router.navigate(['/user/detail']))
    })
  }

  regEmailPass(value) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res)
        this.updateUserData(res.user)
        alert('Akun berhasil dibuat.')
      }, err => {
        reject(err)
        alert(err)
      });
    });
  }

  loginEmailPass(value) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res)
        console.log(res)
        this.router.navigate(['/user/detail'])
      }, err => {
        reject(err)
        alert(err)
      });
    });
  }

  async deleteUser(data) {
    if (confirm('Anda yakin ingin menghapus akun ini ?')) {
    const path: AngularFirestoreDocument<any> = this.afs.doc("users/" + data)
    await path.delete()
    this.router.navigated = false;
    this.router.navigate([this.router.url])
    } else {
      return false
    }
  }

  async authSignOut() {
    await this.afAuth.auth.signOut()
    this.router.navigate(['/login'])
  }

  getUsers() {
    return this.afs.collection<User>("users/").snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as User;
        const id = a.payload.doc.id;
        const index = a.payload.newIndex.valueOf() + 1;
        return { id, ...data, index};
      }))
    );
  }

  getAuthState() {
    return this.afAuth.auth.onAuthStateChanged((user) => {
      if(user) {
        this.ngZone.run(() => this.router.navigate(['/user/detail']))
      } else {
        this.ngZone.run(() => this.router.navigate(['/login']))
      }
    })
  }

  verifyAcc() {
    return this.afAuth.auth.currentUser.sendEmailVerification().then((result) => {
      alert("Permintaan verifikasi email telah dikirimkan. Silahkan cek email Anda.")
      this.ngZone.run(() => this.router.navigate(['/user/detail']))
    }).catch((error) => {
      alert("Gagal memverifikasi email.")
    })
  }

  updateProfile(value) {
    return new Promise<any>((resolve, reject) => {
      const userRef: AngularFirestoreDocument<any> = this.afs.doc("users/" + this.afAuth.auth.currentUser.uid)
      const data = {
        displayName: value.name,
    }
      this.afAuth.auth.currentUser.updateProfile(data)
      .then(async res => {
        resolve(res)
        await userRef.set(data, {merge: true})
        alert("Profile berhasil diperbarui")
        this.router.navigate(['/user/detail'])
      }, err => {
        reject(err)
        alert("Gagal memperbarui profile")
      })
    })
  }
}
