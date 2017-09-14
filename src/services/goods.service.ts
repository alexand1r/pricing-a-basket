import { Injectable } from '@angular/core';
import {Item} from '../data/item.interface';

@Injectable()
export class GoodsService {
  getGoods(): Array<Item> {
    return [
      {name: 'Peas', price: 0.95, amount: 'per bag', 'count': 0},
      {name: 'Eggs', price: 2.10, amount: 'per dozen', 'count': 0},
      {name: 'Milk', price: 1.30, amount: 'per bottle', 'count': 0},
      {name: 'Beans', price: 0.73, amount: 'per can', 'count': 0}
    ];
  }
}
