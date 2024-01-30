import {Component} from '@angular/core';
import {FormGroup, NonNullableFormBuilder} from "@angular/forms";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  public registrationError!:string

  formGroup!: FormGroup

  constructor(fb: NonNullableFormBuilder) {
    this.formGroup = fb.group({
      firstName: ['',],
      lastName: ['',],
      birthDate: ['',],
      email: ['',],
      password: ['',],
      repeatPassword: ['',]
    })
  }

  onRegistrationClick(event: Event) {

  }
}
