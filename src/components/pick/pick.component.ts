import {Component, OnInit, OnDestroy, EventEmitter, Output} from '@angular/core';
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
  basket: any = [];

  currency: string;
  rate: number;
  currencySubscription: any;
  rateSubscription: any;

  constructor(
    private goods: GoodsService,
    private basketService: BasketService,
    private currencyService: CurrencyService,
  ) {}

  ngOnInit(): void {
    this.items = this.goods.getGoods();
    this.basket = this.basketService.basket;
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

  checkItem(item: Item) {
    const index = this.basket.findIndex(x => x.name === item.name);
    return (index > -1 && this.basket[index].count > 0);
  }

  getCurrentIndex(item: Item) {
    const index = this.basket.findIndex(x => x.name === item.name);
    return this.basket[index].count;
  }
}
