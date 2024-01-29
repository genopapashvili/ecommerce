import {Component, OnDestroy, OnInit} from '@angular/core';
import {SessionService} from "../../../../shared/services/session.service";
import {BasketItem, EcommerceService} from "../../../../shared/services/ecommerce.service";
import {mergeWith, Subscription} from "rxjs";
import {catchError, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['../menu.component.css']
})
export class UserMenuComponent implements OnInit, OnDestroy {

  private basketCountingSubscription!: Subscription

  public basketItem: BasketItem[] = []

  constructor(private sessionService: SessionService, private ecommerceService: EcommerceService) {

  }

  ngOnInit() {
    this.basketUpdateControl()
  }

  onLogOutClick() {
    this.sessionService.remove();
  }

  basketUpdateControl() {
    const observer = this.ecommerceService.basketChanges()
      .pipe(switchMap(() => this.ecommerceService.getBasket()))

    this.basketCountingSubscription = this.ecommerceService.getBasket()
      .pipe(mergeWith(observer), catchError(() => []))
      .subscribe(it => this.basketItem = it)
  }

  ngOnDestroy() {
    this.basketCountingSubscription?.unsubscribe()
  }
}
