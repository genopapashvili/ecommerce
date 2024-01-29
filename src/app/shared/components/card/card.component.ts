import {Component, Input} from '@angular/core';
import {Product, Runnable} from "../../../utils/types";
import {EcommerceService} from "../../services/ecommerce.service";
import {catchError} from "rxjs/operators";
import {SessionService} from "../../services/session.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  @Input({required: true})
  public product!: Product


  constructor(private ecommerceService: EcommerceService,
              private sessionService: SessionService,
              private router: Router) {
  }

  getFirstImage() {
    return this.product.images[0]
  }

  onAddItemClick(event: Event) {
    event.stopPropagation();
    this.executeWhenSessionIsActive(() => {
      this.ecommerceService.addToBasket(this.product)
        .pipe(catchError(() => []))
        .subscribe()
    })
  }

  onBuyClick(event: Event) {
    event.stopPropagation();
    this.executeWhenSessionIsActive(() => {

    })
  }

  onSubscribersClick(event: MouseEvent) {
    event.stopPropagation();
  }


  getRates() {
    return this.product.subscribers.map(it => it.rate);
  }

  private executeWhenSessionIsActive(runnable: Runnable) {
    if (this.sessionService.isToken()) {
      runnable()
    } else {
      this.router.navigate(["/login"])
    }
  }
}
