import {Component, Input} from '@angular/core';
import {Product} from "../../../utils/types";
import {EcommerceService} from "../../services/ecommerce.service";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  @Input({required: true})
  public product!: Product


  constructor(private ecommerceService: EcommerceService) {
  }

  getFirstImage() {
    return this.product.images[0]
  }

  onAddItemClick(event: Event) {
    event.stopPropagation();
    this.ecommerceService.addToBasket(this.product);
  }

  onBuyClick(event: Event) {
    event.stopPropagation();
  }

  onSubscribersClick(event: MouseEvent) {
    event.stopPropagation();
  }


  getRates() {
    return this.product.subscribers.map(it => it.rate);
  }
}
