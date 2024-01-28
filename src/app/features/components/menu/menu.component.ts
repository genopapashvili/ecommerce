import {Component, OnDestroy, OnInit} from '@angular/core';
import {SessionService, SessionStatus} from "../../../shared/services/session.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {

  private sessionChangeSubscription!: Subscription

  public status: SessionStatus = 0;

  constructor(private sessionService: SessionService) {

  }

  ngOnInit(): void {
    this.sessionService.sessionChanges()
      .subscribe(status => this.status = status)
  }

  ngOnDestroy(): void {
    this.sessionChangeSubscription?.unsubscribe()
  }

}
