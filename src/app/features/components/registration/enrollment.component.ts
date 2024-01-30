import {Component} from '@angular/core';
import {FormGroup, NonNullableFormBuilder} from "@angular/forms";

@Component({
  selector: 'app-registration',
  templateUrl: './enrollment.component.html',
  styleUrls: ['./enrollment.component.css']
})
export class EnrollmentComponent {

  public enrollmentError!:string

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

  onSignUpClick(event: Event) {

  }
}
