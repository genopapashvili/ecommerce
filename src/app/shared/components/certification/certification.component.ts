import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, NonNullableFormBuilder, Validators} from "@angular/forms";
import {CertificationService} from "./certification.service";
import {SuccessResponse, TokenResponse} from "../../../utils/types";
import {take, tap} from "rxjs/operators";
import * as moment from "moment";
import {interval, map, Subscription} from "rxjs";

@Component({
  selector: 'app-certification',
  templateUrl: './certification.component.html',
  styleUrls: ['./certification.component.css'],
  providers: [CertificationService]
})
export class CertificationComponent implements OnInit, OnDestroy {

  @Input()
  public buttonName = "Confirm"

  @Input()
  public invalidCodeMessage = "Entered code is incorrect"

  @Input({required: true})
  public tokenResponse!: TokenResponse;

  @Output()
  public confirmButtonClick = new EventEmitter<SuccessResponse>()

  error!: string | undefined

  public formControl!: FormControl

  displayTimer = ""
  private intervalSubscription!: Subscription

  constructor(fb: NonNullableFormBuilder, private certificationService: CertificationService) {
    this.formControl = fb.control('', Validators.required)
  }

  ngOnInit() {
    if (this.tokenResponse.expirationDate) {
      const startMoment = moment()
      const endMoment = moment(new Date(this.tokenResponse?.expirationDate))
      const duration = Math.floor(moment.duration(endMoment.diff(startMoment)).asSeconds())

      interval(1000)
        .pipe(take(duration), map(it => ++it))
        .subscribe(it => this.displayTimer = (duration - it).toString())
    }
  }

  onConfirmClick(event: Event) {
    event.preventDefault()

    this.certificationService
      .certify({code: this.formControl.value, token: this.tokenResponse.token})
      .pipe(tap(it => this.confirmButtonClick.emit(it)))
      .subscribe(result => {
        if (result && result.success) {
          this.error = undefined;
        } else {
          this.error = this.invalidCodeMessage;
          this.formControl.reset()
        }
      })
  }

  ngOnDestroy() {
    this.displayTimer = ""
    this.intervalSubscription?.unsubscribe()
  }

}
