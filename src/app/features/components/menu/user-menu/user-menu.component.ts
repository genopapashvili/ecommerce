import {Component, OnInit} from '@angular/core';
import {SessionService} from "../../../../shared/services/session.service";
import {EcommerceService} from "../../../../shared/services/ecommerce.service";

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['../menu.component.css']
})
export class UserMenuComponent implements OnInit {
  constructor(private sessionService: SessionService, private ecommerceService: EcommerceService) {

  }

  ngOnInit() {
    this.ecommerceService.getBasket()
      .subscribe(console.log)
  }

  onLogOutClick() {
    this.sessionService.remove();
  }
}
