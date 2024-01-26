import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from '../../../utils/types';
import {EcommerceService} from '../../../shared/services/ecommerce.service';
import {Router} from '@angular/router';
import {LocationService, UrlBundle} from '../../../shared/services/location.service';
import {catchError, filter, map, switchMap} from 'rxjs/operators';
import {of, Subscription} from 'rxjs';


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit, OnDestroy {

  public products!: Product[];
  private urlChangeSubscription!: Subscription;

  public error = false;

  constructor(private ecommerceService: EcommerceService, private router: Router, private locationService: LocationService) {
  }


  ngOnInit(): void {
    this.urlChangeSubscription = this.locationService.onUrlChanges()
      .pipe(
        filter(it => it.pathname.startsWith('/products')),
        map(toParams),
        switchMap(it => this.ecommerceService.products(it.category, it.query)),
        catchError(it => handleError(it, this)))
      .subscribe(products => this.products = products);
  }

  onProductClick(id: number) {
    this.router.navigate(['product/' + id]);
  }

  ngOnDestroy() {
    this.urlChangeSubscription?.unsubscribe();
  }
}


function toParams(urlBundle: UrlBundle) {
  return {
    category: urlBundle.pathname.split('/').pop() ?? 'All',
    query: urlBundle.searchParams.get('search') ?? ''
  }
}

function handleError(it: any, instance: { error: boolean }) {
  instance.error = true;

  return of([] as Product[]);
}
