import { Injectable } from '@angular/core';
import {Item} from "../data/item.interface";

@Injectable()
export class GoodsService {
  getGoods() : Array<Item> {
    return [
      {id: 1, name: 'Peas', price: 0.95, amount: 'per bag'},
      {id: 2, name: 'Eggs', price: 2.10, amount: 'per dozen'},
      {id: 3, name: 'Milk', price: 1.30, amount: 'per bottle'},
      {id: 4, name: 'Beans', price: 0.73, amount: 'per can'}
    ]
  };
}
