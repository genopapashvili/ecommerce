import {Injectable} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {BehaviorSubject, filter, Observable} from "rxjs";


export type UrlBundle = {
  pathname: string,
  searchParams: URLSearchParams
}

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private urlChanges = new BehaviorSubject<UrlBundle | null>(null);

  constructor(private route: ActivatedRoute, private router: Router) {
    window.onload = () => {
      this.urlChanges.next(this.parseUrl())
    }

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.urlChanges.next(this.parseUrl())
      });
  }


  onUrlChanges() {
    return this.urlChanges
      .pipe(filter(it => it !== null)) as Observable<UrlBundle>
  }

  private parseUrl() {
    const url = new URL(window.location.href);
    const pathname = url.pathname;
    const searchParams = url.searchParams
    return {pathname, searchParams}
  }
}
