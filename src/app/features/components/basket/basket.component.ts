import {Component, OnInit} from '@angular/core';
import {BasketProduct, Product} from "../../../utils/types";
import {EcommerceService} from "../../../shared/services/ecommerce.service";
import {map} from "rxjs";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  public products!: BasketProduct[]
  public total = 0;

  constructor(private ecommerceService: EcommerceService) {
  }


  ngOnInit() {
    this.ecommerceService.getBasket()
      .pipe(map(injectDefaultCheckbox))
      .subscribe(it => this.products = it)
  }

  onAllCheckboxClicked(event: any) {
    const checked = event.target.checked;
    this.products = [...this.products.map(it => changeCheckbox(it, checked))]
    this.countTotalPrice()
  }

  onCheckboxChanges(event: { index: number, checked: boolean }) {
    if (event.index !== undefined) {
      this.products[event.index].checked = event.checked
    }

    this.countTotalPrice()
  }

  countTotalPrice(){
    this.total = this.products
      .filter(it => it.checked)
      .map(it => it.price)
      .reduce((a, it) => a + it, 0)
  }
}


function changeCheckbox(product: BasketProduct, checked: boolean) {
  product.checked = checked
  return product
}

function injectDefaultCheckbox(products: Product[]) {
  const obj = products as BasketProduct[]
  return obj.map(it => changeCheckbox(it, false))
}
