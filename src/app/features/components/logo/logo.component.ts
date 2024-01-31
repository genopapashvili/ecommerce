import {Component, OnDestroy, OnInit} from '@angular/core';
import {SessionService, SessionStatus} from "../../../shared/services/session.service";
import {of, Subscription, switchMap} from "rxjs";
import {EcommerceService} from "../../../shared/services/ecommerce.service";
import {Profile} from "../../../utils/types";

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css']
})
export class LogoComponent implements OnInit, OnDestroy {

  public profile!: Profile | undefined

  private sessionSubscription!: Subscription

  constructor(private sessionService: SessionService, private ecommerceService: EcommerceService) {

  }

  ngOnInit() {
    this.sessionSubscription = this.sessionService.sessionChanges()
      .pipe(switchMap(it => {
        if (it === SessionStatus.created) {
          return this.ecommerceService.profile()
        }
        return of(it)
      }))
      .subscribe(it => {
        if (it !== SessionStatus.removed) {
          this.profile = it
        } else {
          this.profile = undefined
        }
      })
  }

  ngOnDestroy() {
    this.sessionSubscription?.unsubscribe()
  }

}
