import {Product, Runnable} from "../../utils/types";
import {SessionService} from "../services/session.service";
import {Router} from "@angular/router";
import {catchError} from "rxjs/operators";
import {EcommerceService} from "../services/ecommerce.service";

export abstract class AbstractProductActivities {

  public abstract getSessionService(): SessionService

  public abstract getRouter(): Router

  public abstract getEcommerceService(): EcommerceService

  public abstract getProduct(): Product

  private executeWhenSessionIsActive(runnable: Runnable) {
    if (this.getSessionService().isToken()) {
      runnable()
    } else {
      this.getRouter().navigate(["/login"])
    }
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
    return this.getProduct().subscribers.map(it => it.rate);
  }

  onAddItemClick(event: Event) {
    event.stopPropagation();
    this.executeWhenSessionIsActive(() => {
      this.getEcommerceService().addToBasket(this.getProduct())
        .pipe(catchError(() => []))
        .subscribe()
    })
  }

}
