import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {Observable, Subject} from "rxjs";


export type UrlBundle = {
  pathname: string,
  searchParams: URLSearchParams
}

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private urlChanges = new Subject<UrlBundle>();

  constructor(private route: ActivatedRoute, private router: Router, private location: Location) {
    window.onload = () => {
      this.urlChanges.next(this.parseUrl())
    }

    this.location.onUrlChange(() => {
      this.urlChanges.next(this.parseUrl())
    })
  }


  onUrlChanges(): Observable<UrlBundle> {
    return this.urlChanges.asObservable();
  }

  private parseUrl() {
    const url = new URL(window.location.href);
    const pathname = url.pathname;
    const searchParams = url.searchParams

    return {pathname, searchParams}
  }
}
