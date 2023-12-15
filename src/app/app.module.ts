import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavBarComponent} from './features/components/nav-bar/nav-bar.component';
import {SearchComponent} from './features/components/search/search.component';
import {MenuComponent} from './features/components/menu/menu.component';
import {LogoComponent} from './features/components/logo/logo.component';
import {NgOptimizedImage} from "@angular/common";
import {LandingMenuComponent} from './features/components/menu/landing-menu/landing-menu.component';
import {HomeMenuComponent} from './features/components/menu/home-menu/home-menu.component';
import {NgIconComponent, provideIcons} from "@ng-icons/core";
import {
  matContactSupport,
  matInventory2,
  matLogIn, matPayment, matReviews,
  matShop, matShoppingBasket,
  matStarBorder,
  matStarHalf
} from "@ng-icons/material-icons/baseline";
import {ShopComponent} from './features/main/shop/shop.component';
import {RateComponent} from './shared/components/rate/rate.component';
import {matStarOutline} from "@ng-icons/material-icons/outline";
import { CardComponent } from './shared/components/card/card.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SearchComponent,
    MenuComponent,
    LogoComponent,
    LandingMenuComponent,
    HomeMenuComponent,
    ShopComponent,
    RateComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgOptimizedImage,
    NgIconComponent
  ],

  providers: [provideIcons({
    matLogIn,
    matContactSupport,
    matShop,
    matInventory2,
    matStarBorder,
    matStarHalf,
    matStarOutline,
    matReviews,
    matShoppingBasket,
    matPayment
  })],

  bootstrap: [AppComponent]
})
export class AppModule {
}
