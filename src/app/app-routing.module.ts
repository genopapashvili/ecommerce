import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductComponent} from "./shared/components/product/product.component";
import {ShopComponent} from "./features/main/shop/shop.component";
import {LoginComponent} from "./features/components/login/login.component";

const routes: Routes = [
  {
    path: "products/:category", component: ShopComponent
  },
  {
    path: "login", component: LoginComponent
  },
  {
    path: "product/:id", component: ProductComponent
  },
  {
    path: "", redirectTo: "products/All", pathMatch: "full"
  },
  {
    path: "**", redirectTo: "products/All", pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
