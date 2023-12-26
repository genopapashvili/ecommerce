import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Subject, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  static readonly MAIN_FILE_PATH = "http://localhost:4200/config/main.json"


  private subscriber = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {
    this.fetch()
  }

  observable() {
    return this.subscriber.asObservable()
  }

  fetch() {
    this.subscriber.next("1")
  }


}
