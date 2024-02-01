import {Component, OnInit} from '@angular/core';
import {Product} from "../../../utils/types";
import {EcommerceService} from "../../../shared/services/ecommerce.service";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  public products!: Product[]

  constructor(private ecommerceService: EcommerceService) {
  }


  ngOnInit() {
    this.ecommerceService.getBasket()
      .pipe(tap(console.log))
      .subscribe(it => this.products = it)
  }
}
