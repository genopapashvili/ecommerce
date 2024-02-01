import {Component, Input} from '@angular/core';
import {Product} from "../../../../utils/types";

@Component({
  selector: 'app-basket-card',
  templateUrl: './basket-card.component.html',
  styleUrls: ['./basket-card.component.css']
})
export class BasketCardComponent {

  @Input({required: this})
  public product!: Product

}
