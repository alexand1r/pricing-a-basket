import {Component, OnInit} from '@angular/core';
import {GoodsService} from '../services/goods.service';
import {Item} from '../data/item.interface';
import {CurrencyService} from '../services/currency.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  items: Array<Item>;
  rates: Array<{}>;
  currencies: Array<string>;
  currency = 'USD';

  constructor(
    private goods: GoodsService,
    private currencyService: CurrencyService
  ) {}

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

  onChange(currency: string) {
    this.currencyService.setCurrentCurrency(currency);
    const currentRate = this.rates['quotes']['USD' + currency];
    this.currencyService.setCurrentRate(currentRate);
  }
}
