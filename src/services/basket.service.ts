import { Injectable } from '@angular/core';
import { Item } from '../data/item.interface';

@Injectable()
export class BasketService {
  basket: Array<Item> = [];
  total = 0;

  addItem(item: Item) {
    const index = this.basket.findIndex(x => x.name === item.name);
    if (index === -1) {
      this.basket.push({'name': item.name, 'price': item.price, 'amount': item.amount, 'count': 1});
    } else {
      this.basket[index].count++;
    }

    this.total += item.price;
  }

  removeItem(item: Item) {
    const index = this.basket.findIndex(x => x.name === item.name);
    if (index > -1) {
      if (this.basket[index].count > 1){
        this.basket[index].count--;
        this.total = (this.total - item.price > 0) ? this.total - item.price : 0;
      } else {
        this.basket.splice(index, 1);
        this.total = (this.total - item.price > 0) ? this.total - item.price : 0;
      }
    }
  }

}
