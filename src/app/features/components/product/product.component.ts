import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {EcommerceService} from "../../../shared/services/ecommerce.service";
import {Product, ProductParam} from "../../../utils/types";
import {map, switchMap} from "rxjs";
import {Optional} from "../../../utils/optional";
import {AbstractProductActivities} from "../../../shared/components/AbstractProductActivities";
import {SessionService} from "../../../shared/services/session.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent extends AbstractProductActivities implements OnInit {

  public product!: Product

  public selectedImage: string | undefined

  @ViewChild('imgList') imgList!: ElementRef;

  constructor(private sessionService: SessionService, private ecommerce: EcommerceService, private router: Router, private route: ActivatedRoute) {
    super()
  }

  override getProduct(): Product {
    return this.product;
  }

  override getEcommerceService(): EcommerceService {
    return this.ecommerce;
  }

  override getRouter(): Router {
    return this.router;
  }

  override getSessionService(): SessionService {
    return this.sessionService;
  }

  ngOnInit(): void {
    this.injectProduct()
  }

  private injectProduct() {
    this.route.params
      .pipe(map(it => it as ProductParam))
      .pipe(map(it => parseInt(it.id.replace(/[^0-9]/, ""))))
      .pipe(map(it => checkProductId(it)))
      .pipe(switchMap(it => this.ecommerce.product(it)))
      .subscribe({
        next: (it) => {
          this.product = it;
          this.onProductInjected()
        },
        error: () => {
          this.router.navigate(["/products/All"])
            .then()
        }
      })
  }

  private onProductInjected() {
    this.injectDefaultImage()
  }

  private injectDefaultImage() {
    this.selectedImage = Optional.of(this.product.images)
      .map(it => it[0])
      .orElseUndefined()
  }

  onImageHover(image: string) {
    this.selectedImage = image
  }

  scrollDown() {
    const imgList = this.imgList.nativeElement;
    imgList.scrollTop += 8 * 16;
  }

  scrollUp() {
    const imgList = this.imgList.nativeElement;
    imgList.scrollTop -= 8 * 16;
  }

}


function checkProductId(productId: number) {
  if (isNaN(productId)) {
    throw new Error("invalid param")
  }

  return productId;
}
