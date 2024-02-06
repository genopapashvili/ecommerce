import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductComponent} from "./features/components/product/product.component";
import {ShopComponent} from "./features/main/shop/shop.component";
import {LoginComponent} from "./features/components/login/login.component";
import {SessionGuard} from "./shared/guards/sessionGuard";
import {ForgetPasswordComponent} from "./features/components/forget-password/forget-password.component";
import {RegistrationComponent} from "./features/components/registration/registration.component";
import {BasketComponent} from "./features/components/basket/basket.component";
import {AboutComponent} from "./features/components/about/about.component";
import {ProfileComponent} from "./features/components/profile/profile.component";

const routes: Routes = [
  {
    path: "products/:category", component: ShopComponent
  },
  {
    path: "forget-password", component: ForgetPasswordComponent, canActivate: [SessionGuard]
  },
  {
    path: "registration", component: RegistrationComponent, canActivate: [SessionGuard]
  },
  {
    path: "login", component: LoginComponent, canActivate: [SessionGuard]
  },
  {
    path: "basket", component: BasketComponent, canActivate: [SessionGuard]
  },
  {
    path: "profile", component: ProfileComponent, canActivate: [SessionGuard]
  },
  {
    path: "about", component: AboutComponent
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
