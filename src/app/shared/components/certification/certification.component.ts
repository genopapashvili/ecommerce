import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, NonNullableFormBuilder, Validators} from "@angular/forms";
import {CertificationService} from "./certification.service";
import {SuccessResponse, TokenResponse} from "../../../utils/types";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-certification',
  templateUrl: './certification.component.html',
  styleUrls: ['./certification.component.css'],
  providers: [CertificationService]
})
export class CertificationComponent implements OnInit {

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

  constructor(fb: NonNullableFormBuilder, private certificationService: CertificationService) {
    this.formControl = fb.control('', Validators.required)
  }

  ngOnInit() {
    console.log(this.tokenResponse.expirationDate?.getSeconds())
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

}
