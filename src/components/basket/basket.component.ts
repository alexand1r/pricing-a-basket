import { Component, OnInit } from '@angular/core';
import { BasketService } from '../../services/basket.service';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.html'
})
export class BasketComponent implements OnInit {
  emptyMsg = 'There are no items in your basket!';
  total: number;
  items: any = {};
  empty: boolean;
  currencies: Array<string>;
  rates: Array<{}>;
  convertedTotal: number;
  currency: string;

  constructor(
    private basket: BasketService,
    private currencyService: CurrencyService
  ) {}

  ngOnInit(): void {
    this.total = this.basket.total;
    this.items = this.basket.items;
    this.empty = this.basket.empty;
    this.currencies = this.currencyService.getCurrencies();
    this.currencyService.getCurrencyRates()
      .then((data) => {
        this.rates = data.json();
      })
      .catch((err) => {
        console.log(err);
      });
    this.convertedTotal = this.total;
    this.currency = this.currencies[0];
  }

  onChange(currency: string) {
    this.convertedTotal = this.total * this.rates['quotes']['USD' + currency];
    this.currency = currency;
  }

}
