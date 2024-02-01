import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavBarComponent} from './features/components/nav-bar/nav-bar.component';
import {SearchComponent} from './features/components/search/search.component';
import {MenuComponent} from './features/components/menu/menu.component';
import {LogoComponent} from './features/components/logo/logo.component';
import {NgOptimizedImage} from "@angular/common";
import {NgIconComponent, provideIcons} from "@ng-icons/core";
import {
  matContactSupport,
  matInfo,
  matInventory2,
  matLogIn,
  matLogOut,
  matPayment,
  matPerson,
  matReviews,
  matShop,
  matShoppingBasket,
  matStarBorder,
  matStarHalf
} from "@ng-icons/material-icons/baseline";
import {ShopComponent} from './features/main/shop/shop.component';
import {RateComponent} from './shared/components/rate/rate.component';
import {matShopifyOutline, matStarOutline} from "@ng-icons/material-icons/outline";
import {CardComponent} from './shared/components/card/card.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ProductComponent} from './shared/components/product/product.component';
import {LoginComponent} from './features/components/login/login.component';
import {ReactiveFormsModule} from "@angular/forms";
import {InspectDirective} from './shared/directives/inspect.directive';
import {UserMenuComponent} from './features/components/menu/user-menu/user-menu.component';
import {DefaultMenuComponent} from './features/components/menu/default-menu/default-menu.component';
import {ForgetPasswordComponent} from './features/components/forget-password/forget-password.component';
import {RegistrationComponent} from './features/components/registration/registration.component';
import {BasketComponent} from './features/components/basket/basket.component';
import {SessionInterceptor} from "./shared/interceptors/session.interceptor";
import {AuthFormContainerComponent} from './shared/components/auth-form-container/auth-form-container.component';
import {CertificationComponent} from './shared/components/certification/certification.component';
import {FooterComponent} from './features/components/footer/footer.component';
import {AboutComponent} from './features/components/about/about.component';
import {cssHomeAlt} from "@ng-icons/css.gg";
import {circumCreditCard2, circumShoppingBasket} from "@ng-icons/circum-icons";
import { BasketCardComponent } from './features/components/basket/basket-card/basket-card.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SearchComponent,
    MenuComponent,
    LogoComponent,
    ShopComponent,
    RateComponent,
    CardComponent,
    ProductComponent,
    LoginComponent,
    InspectDirective,
    UserMenuComponent,
    DefaultMenuComponent,
    ForgetPasswordComponent,
    RegistrationComponent,
    BasketComponent,
    AuthFormContainerComponent,
    CertificationComponent,
    FooterComponent,
    AboutComponent,
    BasketCardComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NgOptimizedImage,
    NgIconComponent,
    ReactiveFormsModule
  ],

  providers: [provideIcons({
    matInfo,
    circumCreditCard2,
    circumShoppingBasket,
    cssHomeAlt,
    matLogIn,
    matLogOut,
    matContactSupport,
    matShop,
    matInventory2,
    matStarBorder,
    matStarHalf,
    matStarOutline,
    matReviews,
    matShoppingBasket,
    matPayment,
    matPerson,
    matShopifyOutline
  }),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SessionInterceptor,
      multi: true,
    },],

  bootstrap: [AppComponent]
})
export class AppModule {
}
