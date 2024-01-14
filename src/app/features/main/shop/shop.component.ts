import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../../shared/services/product.service";
import {Product} from "../../../utils/types";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  products!: Product[]

  constructor(private productService: ProductService) {

  }

  ngOnInit(): void {
    this.productService.products()
      .subscribe(it => this.products = it)
  }

}
