import {Component} from '@angular/core';
import {FormGroup, NonNullableFormBuilder, Validators} from "@angular/forms";
import {SessionService} from "../../../shared/services/session.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public formGroup: FormGroup

  public loginError: string | null = null

  constructor(fb: NonNullableFormBuilder, private sessionService: SessionService, private router: Router) {
    this.formGroup = fb.group({
      email: ['', Validators.email],
      password: ['', Validators.required]
    });
  }

  onLoginClick(event: Event) {
    event.preventDefault()
    if (this.formGroup.valid) {
      this.sessionService.create(this.formGroup.value)
        .subscribe(it => {
          if (it.error) {
            this.loginError = it.error
            this.formGroup.reset("")
          } else {
            this.router.navigate(["/products/All"])
          }
        })
    }
  }

}
