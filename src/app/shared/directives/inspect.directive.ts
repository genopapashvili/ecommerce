import {Directive, HostBinding, HostListener, Optional} from '@angular/core';
import {NgControl} from "@angular/forms";
import {Optional as Desired} from "../../utils/optional"

@Directive({
  selector: '[inspect]'
})
export class InspectDirective {

  @HostBinding('class.invalid') isInvalid = false;


  constructor(@Optional() private ngControl: NgControl) {
    Desired.of(ngControl).orElseThrow(() => new Error("input field must be form controlled to use this directive"))
  }

  @HostListener('input') onInput() {
    Desired.of(this.ngControl.control)
      .ifIsPresent(it => {
        this.isInvalid = it.invalid;
      })
  }
}
