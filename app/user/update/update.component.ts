import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  updtprofileForm: FormGroup

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.updtprofileForm = this.fb.group({
      name: ['', Validators.required]
    })
  }

  public showAlert = false;
  
  async onUpdte() {
    if(this.updtprofileForm.valid) {
      let valueForm = this.updtprofileForm.value
      await this.auth.updateProfile(valueForm)
      this.router.navigate(['/user/detail'])
    } else {
      this.showAlert = true
      setTimeout(() => {
        this.showAlert = false
      }, 3000)
    }
  }

}
