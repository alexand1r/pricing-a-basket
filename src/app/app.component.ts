import {Component, OnInit, OnDestroy} from '@angular/core';
import {GoodsService} from '../services/goods.service';
import {Item} from '../data/item.interface';
import {CurrencyService} from '../services/currency.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  items: Array<Item>;
  rates: Array<{}>;
  currencies: Array<string>;
  currency = 'USD';
  rate: number;
  currencySubscription: any;
  rateSubscription: any;

  constructor(
    private goods: GoodsService,
    private currencyService: CurrencyService
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
    this.items = this.goods.getGoods();
    this.currencies = this.currencyService.getCurrencies();
    this.currencyService.getCurrencyRates()
      .then((data) => {
        this.rates = data.json();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.currencySubscription.unsubscribe();
    this.rateSubscription.unsubscribe();
  }

  onChange(currency: string) {
    this.currencyService.setCurrentCurrency(currency);
    const currentRate = this.rates['quotes']['USD' + currency];
    this.currencyService.setCurrentRate(currentRate);
  }
}
