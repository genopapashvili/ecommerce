import {Component, OnInit} from '@angular/core';
import {Product} from "../../../utils/types";
import {EcommerceService} from "../../../shared/services/ecommerce.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  products!: Product[]

  constructor(private ecommerceService: EcommerceService, private router: Router) {

  }

  ngOnInit(): void {
    this.ecommerceService.products()
      .subscribe(it => this.products = it)
  }

  onProductClick(id: number) {
    this.router.navigate(["product/" + id])
      .then();
  }
}
