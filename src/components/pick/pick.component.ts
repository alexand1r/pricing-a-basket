import {Component, OnInit, OnDestroy} from '@angular/core';
import {GoodsService} from '../../services/goods.service';
import {BasketService} from '../../services/basket.service';
import {Item} from '../../data/item.interface';
import {CurrencyService} from '../../services/currency.service';

@Component({
  selector: 'app-pick',
  templateUrl: './pick.html'
})
export class PickComponent implements OnInit, OnDestroy {
  items: Array<Item>;
  basket: any = {};
  currency: string;
  rate: number;
  currencySubscription: any;
  rateSubscription: any;
  constructor(
    private goods: GoodsService,
    private basketService: BasketService,
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
    this.items = this.goods.getGoods();
    this.basket = this.basketService.items;
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.currencySubscription.unsubscribe();
    this.rateSubscription.unsubscribe();
  }

  addItem(item: Item) {
    this.basketService.addItem(item);
  }

  removeItem(item: Item) {
    this.basketService.removeItem(item);
  }
}
