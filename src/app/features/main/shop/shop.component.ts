import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from "../../../utils/types";
import {EcommerceService} from "../../../shared/services/ecommerce.service";
import {Router} from "@angular/router";
import {LocationService, UrlBundle} from "../../../shared/services/location.service";
import {map, Subscription} from "rxjs";
import {Optional} from "../../../utils/optional";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit, OnDestroy {

  products!: Product[]
  private urlChangeSubscription!: Subscription

  constructor(private ecommerceService: EcommerceService, private router: Router, private locationService: LocationService) {

  }

  ngOnInit(): void {
    this.urlChangeSubscription = this.locationService.onUrlChanges()
      .pipe(map(toParams))
      .subscribe(it => {
        this.ecommerceService.products(it.category, it.query)
          .subscribe(it => this.products = it)
      })
  }

  onProductClick(id: number) {
    this.router.navigate(["product/" + id])
      .then();
  }

  ngOnDestroy() {
    Optional.of(this.urlChangeSubscription).ifIsPresent(it => it.unsubscribe())
  }
}

function toParams(urlBundle: UrlBundle) {
  return {
    category: Optional.of(urlBundle.pathname.split("/").pop()).orElse("All") as string,
    query: Optional.of(urlBundle.searchParams.get("search")).orElse("") as string
  }
}
