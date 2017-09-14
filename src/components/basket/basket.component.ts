import {Component, OnInit, OnDestroy, Input} from '@angular/core';
import { BasketService } from '../../services/basket.service';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.html'
})
export class BasketComponent implements OnInit, OnDestroy {
  emptyMsg = 'There are no items in your basket!';
  total: number;
  items: any = [];

  currency: string;
  rate: number;
  currencySubscription: any;
  rateSubscription: any;

  constructor(
    private basket: BasketService,
    private currencyService: CurrencyService,
  ) {}

  ngOnInit(): void {
    this.total = this.basket.total;
    this.items = this.basket.basket;
    this.currency = this.currencyService.currency;
    this.currencySubscription = this.currencyService.currencyChange.subscribe((value) => {
      this.currency = value;
    });
    this.rate = this.currencyService.rate;
    this.rateSubscription = this.currencyService.rateChange.subscribe((value) => {
      this.rate = value;
    });
  }

  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.currencySubscription.unsubscribe();
    this.rateSubscription.unsubscribe();
  }
}
