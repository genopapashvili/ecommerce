import {Component, OnInit} from '@angular/core';
import {Product} from "../../../utils/types";
import {EcommerceService} from "../../../shared/services/ecommerce.service";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  products!: Product[]

  constructor(private ecommerceService: EcommerceService) {

  }

  ngOnInit(): void {
    this.ecommerceService.products()
      .subscribe(it => this.products = it)
  }

}
