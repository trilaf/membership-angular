import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseFirestore } from '@angular/fire';
import { AuthService, User } from 'src/app/core/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users = this.auth.getUsers();

  constructor(
    private auth: AuthService,
    private rtr: Router,
  ) { }

  ngOnInit() {
    console.log("init list");
    // this.auth.getUsers().subscribe(result => {
    //   console.log(result[0].payload.doc.data() as User);
    //   this.users = result
    // })
    //this.users = this.auth.getUsers().pipe(
    //  map(actions => actions.map(a => {
      //  const data = a.payload.doc.data() as User;
       // const id = a.payload.doc.id;
       // const index = a.payload.newIndex.valueOf() + 1;
       // return { id, ...data, index};
     // }))
   // );
  }

}
