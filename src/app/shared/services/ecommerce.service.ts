import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Product} from "../../utils/types";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EcommerceService {

  constructor(private http: HttpClient) {

  }

  categories() {
    return this.http.get<string[]>(environment.apiUrl + "/categories")
  }

  public products() {
    return this.http.get<Product[]>(environment.apiUrl + "/products")
      .pipe(map(addImagesPath))
  }

  product(param: number) {
    return this.http.get<Product>(environment.apiUrl + "/product/" + param)
      .pipe(map(addImagePath))
  }
}

function addImagesPath(it: Product[]) {
  return it.map(addImagePath)
}

function addImagePath(product: Product) {
  product.images = product.images.map(i => environment.apiUrl + "/assets/" + i);

  return product;
}
