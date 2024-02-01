import {Component, OnDestroy, OnInit} from '@angular/core';
import {SessionService} from "../../../../shared/services/session.service";
import {EcommerceService} from "../../../../shared/services/ecommerce.service";
import {mergeWith, of, Subscription} from "rxjs";
import {catchError, switchMap} from "rxjs/operators";
import {BasketLengthResponse} from "../../../../utils/types";

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['../menu.component.css']
})
export class UserMenuComponent implements OnInit, OnDestroy {

  private basketCountingSubscription!: Subscription

  public basketLength!: number

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
      .pipe(switchMap(() => this.ecommerceService.getBasketLength()))

    this.basketCountingSubscription = this.ecommerceService.getBasketLength()
      .pipe(mergeWith(observer), catchError(() => {
        return of(({length: 0} as BasketLengthResponse))
      }))
      .subscribe(it => this.basketLength = it.length)
  }

  ngOnDestroy() {
    this.basketCountingSubscription?.unsubscribe()
  }
}
