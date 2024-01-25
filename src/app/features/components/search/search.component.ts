import {AfterContentInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {EcommerceService} from "../../../shared/services/ecommerce.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {Optional} from "../../../utils/optional";
import {debounceTime, delayWhen, fromEvent, interval, map, Subscription} from "rxjs";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, AfterContentInit, OnDestroy {

  public categories!: string[]


  @ViewChild("categoryDropdown")
  private categoryDropDown!: ElementRef

  @ViewChild("searchInput", {static: true})
  private searchInputElementRef!: ElementRef


  private searchEventSubscription!: Subscription

  constructor(private ecommerce: EcommerceService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.injectingCategories();
    this.listeningSearchInputField();
  }

  ngAfterContentInit(): void {
    this.setCategoryDropDownByTheRouter()
  }


  ngOnDestroy() {
    Optional.of(this.searchEventSubscription)
      .ifIsPresent(it => it.unsubscribe())
  }

  onCategoryClick(category: string) {
    this.navigateRouter(category, this.searchInputElementRef.nativeElement.value);
  }

  private navigateRouter(category: string, search: string) {
    const queryParams = {search};
    this.router.navigate(['products/' + category], {queryParams})
      .then();
  }

  private listeningSearchInputField() {
    this.searchEventSubscription = fromEvent<any>(this.searchInputElementRef.nativeElement, "input")
      .pipe(
        map((it) => it.target.value as string),
        debounceTime(500)
      )
      .subscribe((it) => {
        this.navigateRouter(this.categoryDropDown.nativeElement.innerText, it)
      })
  }

  private injectingCategories() {
    this.ecommerce.categories()
      .subscribe(it => this.categories = it)
  }

  private setCategoryDropDownByTheRouter() {
    this.router.events
      .pipe(
        delayWhen(() => interval(Optional.of(this.categories).isPresent() ? 0 : 10))
      )
      .subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.categoryDropDown.nativeElement.innerText = Optional.of(this.categories)
            .map(it => it.find(e => event.url.includes(e)))
            .orElse("All");
        }
      })
  }
}
