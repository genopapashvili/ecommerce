import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup, NonNullableFormBuilder, Validators} from "@angular/forms";
import {map, Subscription} from "rxjs";
import {EnrollmentService} from "../../../shared/services/enrollment.service";
import {Router} from "@angular/router";
import {LocationService} from "../../../shared/services/location.service";
import {TokenResponse} from "../../../utils/types";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit, OnDestroy {

  public registrationError!: string

  repeatPasswordChangeSubscription!: Subscription
  urlChangesSubscription!: Subscription

  formGroup!: FormGroup


  step: string | null = null

  tokenResponse: TokenResponse | undefined;

  constructor(private fb: NonNullableFormBuilder, private enrollmentService: EnrollmentService, private router: Router, private locationService: LocationService) {
    this.createFormGroup()
  }

  ngOnInit() {
    this.checkPassword()
    this.urlChangesListener();
  }

  onSignUpClick(event: Event) {
    event.preventDefault();
    const data = {...this.formGroup.value}
    delete data.repeatPassword

    this.enrollmentService.register(data)
      .subscribe((it) => {
        if (it.token) {
          this.tokenResponse = it;
          this.router.navigate(["/registration"], {queryParams: {step: "certify"}});
        }
      })
  }

  checkPassword() {
    const passwordControl = this.formGroup.controls['password'];
    const repeatPasswordControl = this.formGroup.controls['repeatPassword'];
    this.repeatPasswordChangeSubscription = repeatPasswordControl.valueChanges
      .subscribe(it => {
        if (it !== passwordControl.value) {
          repeatPasswordControl.setErrors({repeatPassword: {invalid: true}});
        } else {
          repeatPasswordControl.setErrors(null);
        }
      })
  }

  ngOnDestroy() {
    this.tokenResponse = undefined;
    this.repeatPasswordChangeSubscription?.unsubscribe();
    this.urlChangesSubscription?.unsubscribe();
  }

  createFormGroup() {
    this.formGroup = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', [Validators.required, Validators.pattern(/[0-9]{4}-[0-9]{2}-[0-9]{2}/g)]],
      email: ['', Validators.email],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required]
    })
  }

  private urlChangesListener() {
    this.locationService.onUrlChanges()
      .pipe(map(it => it.searchParams.get("step")))
      .subscribe(it => this.step = it)
  }
}
