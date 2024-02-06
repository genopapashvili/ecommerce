import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {EcommerceService} from "../../../shared/services/ecommerce.service";
import {Product, ProductParam} from "../../../utils/types";
import {map, switchMap} from "rxjs";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public product!: Product

  constructor(private ecommerce: EcommerceService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.route.params
      .pipe(map(it => it as ProductParam))
      .pipe(map(it => parseInt(it.id.replace(/[^0-9]/, ""))))
      .pipe(map(it => checkProductId(it)))
      .pipe(switchMap(it => this.ecommerce.product(it)))
      .subscribe({
        next: (it) => {
          this.product = it;
        },
        error: (e) => {
          this.router.navigate(["/products/All"])
            .then()
        }
      })
  }

}


function checkProductId(productId: number) {
  if (isNaN(productId)) {
    throw new Error("invalid param")
  }

  return productId;
}
