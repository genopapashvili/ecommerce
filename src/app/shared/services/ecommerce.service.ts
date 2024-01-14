import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EcommerceService {

  constructor(private http: HttpClient) {

  }

  categories() {
    return this.http.get<string[]>("http://localhost:3001/categories")
  }
}
