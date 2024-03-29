import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {BasketLengthResponse, Product, Profile, SuccessResponse} from "../../utils/types";
import {map, Subject} from "rxjs";
import {switchMap, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class EcommerceService {

  private basketSubject = new Subject();

  constructor(private http: HttpClient) {

  }

  categories() {
    return this.http.get<string[]>(environment.apiUrl + "/categories")
  }

  public products(category: string, query: string) {
    return this.http.get<Product[]>(environment.apiUrl + "/products?category=" + category + "&query=" + query)
      .pipe(map(addImagesPath))
  }


  product(param: number) {
    return this.http.get<Product>(environment.apiUrl + "/product/" + param)
      .pipe(map(addImagePath))
  }

  basketChanges() {
    return this.basketSubject
      .pipe(switchMap(() => this.getBasket()))
  }

  getBasketLength() {
    return this.http.get<BasketLengthResponse>(environment.apiUrl + "/basket-length")
  }

  deleteBasketItem(id: number) {
    return this.http.delete(environment.apiUrl = "/basket", {body: {id}})
      .pipe(tap((it) => this.basketSubject.next(it)))
  }

  getBasket() {
    return this.http.get<Product[]>(environment.apiUrl + "/basket")
      .pipe(map(addImagesPath))
  }

  addToBasket(product: Product) {
    return this.http.post<SuccessResponse>(environment.apiUrl + "/basket", {id: product.id})
      .pipe(tap((it) => this.basketSubject.next(it)))
  }

  profile() {
    return this.http.get<Profile>(environment.apiUrl + "/profile");
  }
}

function addImagesPath(it: Product[]) {
  return it.map(addImagePath)
}

function addImagePath(product: Product) {
  product.images = product.images?.map(i => environment.apiUrl + "/assets/" + i);

  return product;
}
