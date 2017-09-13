import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Subject} from 'rxjs';

const api = 'http://apilayer.net/api/live?access_key=a5a53e00054b4de4781c0ab111ddcb10&currencies=USD,EUR,GBP,CAD,PLN&source=USD&format=1';

@Injectable()
export class CurrencyService {
  currency: string;
  currencyChange: Subject<string> = new Subject<string>();
  rate: number;
  rateChange: Subject<number> = new Subject<number>();
  constructor(private http: Http) {
    this.currency = 'USD';
    this.rate = 1;
  }
  getCurrencies(): Array<string> {
    return ['USD', 'GBP', 'EUR', 'CAD', 'PLN'];
  }
  getCurrencyRates() {
    return this.http.get(api).toPromise();
  }
  setCurrentCurrency(currency: string) {
    this.currency = currency;
    this.currencyChange.next(this.currency);
  }
  setCurrentRate(rate: number) {
    this.rate = rate;
    this.rateChange.next(this.rate);
  }
}
