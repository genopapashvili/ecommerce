import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductComponent} from "./shared/components/product/product.component";
import {ShopComponent} from "./features/main/shop/shop.component";
import {LoginComponent} from "./features/components/login/login.component";
import {SessionGuard} from "./shared/guards/sessionGuard";
import {ForgetPasswordComponent} from "./features/components/forget-password/forget-password.component";
import {EnrollmentComponent} from "./features/components/registration/enrollment.component";
import {BasketComponent} from "./features/components/basket/basket.component";

const routes: Routes = [
  {
    path: "products/:category", component: ShopComponent
  },
  {
    path: "forget-password", component: ForgetPasswordComponent, canActivate: [SessionGuard]
  },
  {
    path: "enrollment", component: EnrollmentComponent, canActivate: [SessionGuard]
  },
  {
    path: "login", component: LoginComponent, canActivate: [SessionGuard]
  },
  {
    path: "basket", component: BasketComponent, canActivate: [SessionGuard]
  },
  {
    path: "profile", component: BasketComponent, canActivate: [SessionGuard]
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
