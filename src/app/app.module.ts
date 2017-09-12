import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppRoutesModule } from './routes.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from '../components/home/home.component';
import { PickComponent } from '../components/pick/pick.component';
import { BasketComponent } from '../components/basket/basket.component';
import { NavComponent } from '../components/nav/nav.component';

import { GoodsService } from '../services/goods.service';
import { BasketService } from '../services/basket.service';
import { CurrencyService } from '../services/currency.service';

import { KeysPipe } from '../pipes/keys.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PickComponent,
    BasketComponent,
    NavComponent,
    KeysPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutesModule,
    FormsModule
  ],
  providers: [
    GoodsService,
    BasketService,
    CurrencyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
