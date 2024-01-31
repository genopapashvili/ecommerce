import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, NonNullableFormBuilder, Validators} from "@angular/forms";
import {CertificationService} from "./certification.service";
import {TokenResponse} from "../../../utils/types";

@Component({
  selector: 'app-certification',
  templateUrl: './certification.component.html',
  styleUrls: ['./certification.component.css'],
  providers: [CertificationService]
})
export class CertificationComponent {

  @Input()
  public buttonName = "Confirm"

  @Input({required: true})
  public tokenResponse!: TokenResponse;

  @Output()
  public confirmButtonClick = new EventEmitter()

  error!: string

  public formControl!: FormControl

  constructor(fb: NonNullableFormBuilder, private certificationService: CertificationService) {
    this.formControl = fb.control('', Validators.required)
  }

  onConfirmClick(event: Event) {
    event.preventDefault()

    this.certificationService
      .certify({code: this.formControl.value, token: this.tokenResponse.token})
      .subscribe()
  }

}
