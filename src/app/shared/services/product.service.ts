import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Product} from "../../utils/types";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {

  }

  public products() {
    return this.http.get<Product[]>(environment.apiUrl + "/products")
      .pipe(map(addImagePath))
  }
}

function addImagePath(it: Product[]){
  return it.map(p => {
    p.images = p.images.map(i => environment.apiUrl + "/assets/" + i);

    return p;
  })
}
