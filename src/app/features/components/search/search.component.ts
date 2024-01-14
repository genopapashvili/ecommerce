import {AfterContentInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {EcommerceService} from "../../../shared/services/ecommerce.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {Optional} from "../../../utils/optional";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit,AfterContentInit {

  @ViewChild("categoryDropdown")
  private categoryDropDown!: ElementRef


  public categories!: string[]

  constructor(private ecommerce: EcommerceService, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit(): void {
    this.ecommerce.categories()
      .subscribe(it => this.categories = it)
  }

  ngAfterContentInit(): void {
    this.router.events.subscribe(event => {

      if (event instanceof NavigationEnd) {
        this.categoryDropDown.nativeElement.innerText = Optional.of(this.categories)
          .map(it => it.find(e => event.url.includes(e)))
          .orElse("All");
      }
    })
  }


}
