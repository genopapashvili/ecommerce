import {Component, Input} from '@angular/core';
import {Product} from "../../../utils/types";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  @Input({required: true})
  public product!: Product


  getFirstImage() {
    return this.product.images[0]
  }

  onAddItemClick(event: Event) {
    event.stopPropagation();
  }

  onBuyClick(event: Event) {
    event.stopPropagation();
  }

  onSubscribersClick(event: MouseEvent) {
    event.stopPropagation();
  }


  getRates(){
      return this.product.subscribers.map( it => it.rate);
  }
}
