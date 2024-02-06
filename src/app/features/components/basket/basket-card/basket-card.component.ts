import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BasketProduct} from "../../../../utils/types";
import {Router} from "@angular/router";


export type CheckboxEvent = {
  index: number
  checked: boolean
}

@Component({
  selector: 'app-basket-card',
  templateUrl: './basket-card.component.html',
  styleUrls: ['./basket-card.component.css']
})
export class BasketCardComponent implements OnInit {

  @Input()
  public index!: number

  @Input({required: this})
  public product!: BasketProduct

  @Output()
  public checkboxChanged = new EventEmitter<CheckboxEvent>();

  constructor(private router: Router) {
  }

  ngOnInit() {

  }

  onSubscribersClick(event: MouseEvent) {
    event.stopPropagation();
  }


  getProductRates() {
    return this.product.subscribers.map(it => it.rate)
  }

  onBasketCardClick(event: Event) {
    event.stopPropagation()
    this.router.navigate(["product/" + this.product.id])
  }

  onCheckboxChange(event: any) {
    event.stopPropagation()
    const checked = event.target.checked;
    this.checkboxChanged.emit({
      index: this.index,
      checked
    })
  }

}
