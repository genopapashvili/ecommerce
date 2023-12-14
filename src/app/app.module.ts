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
import {matContactSupport, matInventory2, matLogIn, matShop} from "@ng-icons/material-icons/baseline";
import { ShopComponent } from './features/main/shop/shop.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SearchComponent,
    MenuComponent,
    LogoComponent,
    LandingMenuComponent,
    HomeMenuComponent,
    ShopComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgOptimizedImage,
    NgIconComponent
  ],

  providers: [provideIcons({matLogIn,matContactSupport,matShop,matInventory2})],

  bootstrap: [AppComponent]
})
export class AppModule {
}
