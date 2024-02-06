import {Component, Input} from '@angular/core';
import {Product} from "../../../utils/types";
import {EcommerceService} from "../../services/ecommerce.service";
import {SessionService} from "../../services/session.service";
import {Router} from "@angular/router";
import {AbstractProductActivities} from "../AbstractProductActivities";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent extends AbstractProductActivities {

  @Input({required: true})
  public product!: Product


  constructor(private ecommerceService: EcommerceService,
              private sessionService: SessionService,
              private router: Router) {
    super()
  }

  getFirstImage() {
    return this.product.images[0]
  }

  getEcommerceService(): EcommerceService {
    return this.ecommerceService;
  }

  getProduct(): Product {
    return this.product;
  }

  getRouter(): Router {
    return this.router;
  }

  getSessionService(): SessionService {
    return this.sessionService;
  }

}
