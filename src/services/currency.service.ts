import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

const api = 'http://apilayer.net/api/live?access_key=a5a53e00054b4de4781c0ab111ddcb10&currencies=USD,EUR,GBP,CAD,PLN&source=USD&format=1';

@Injectable()
export class CurrencyService {
  constructor(private http: Http) {}

  getCurrencies() : Array<string> {
    return [
        'USD', 'GBP', 'EUR', 'CAD', 'PLN'
      ]
  };

  getCurrencyRates() {
    return this.http.get(api).toPromise();
  }
}
