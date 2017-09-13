import {Component, OnInit, OnDestroy} from '@angular/core';
import { BasketService } from '../../services/basket.service';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.html'
})
export class BasketComponent implements OnInit, OnDestroy {
  emptyMsg = 'There are no items in your basket!';
  total: number;
  items: any = {};
  empty: boolean;
  currency: string;
  rate: number;
  currencySubscription: any;
  rateSubscription: any;

  constructor(
    private basket: BasketService,
    private currencyService: CurrencyService,
  ) {
    this.currency = currencyService.currency;
    this.currencySubscription = currencyService.currencyChange.subscribe((value) => {
      this.currency = value;
    });
    this.rate = currencyService.rate;
    this.rateSubscription = currencyService.rateChange.subscribe((value) => {
      this.rate = value;
    });
  }
  ngOnInit(): void {
    this.total = this.basket.total;
    this.items = this.basket.items;
    this.empty = this.basket.empty;
  }
  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.currencySubscription.unsubscribe();
    this.rateSubscription.unsubscribe();
  }
}
