import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from "./app.component";
import {ProductComponent} from "./shared/components/product/product.component";
import {ShopComponent} from "./features/main/shop/shop.component";

const routes: Routes = [
  {
    path: "products/:category", component: ShopComponent
  },
  {
    path: "product/:id", component: ProductComponent
  },
  {
    path: "", redirectTo: "products/All", pathMatch: "full"
  },
  {
    path: "**", component: ShopComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
