import { Injectable } from '@angular/core';
import { Item } from "../data/item.interface";

@Injectable()
export class BasketService {
  items : any = {};
  total : number = 0;
  empty : boolean = true;

  addItem(item : Item) {
    if (!this.items.hasOwnProperty(item.name)) {
      this.items[item.name] = 1;
    } else {
      this.items[item.name]++;
    }

    this.empty = false;
    this.total += item.price;
  }

  removeItem(item : Item) {
    if (this.items.hasOwnProperty(item.name)) {
      if (this.items[item.name] >= 1) {
        this.items[item.name]--;
        this.total = (this.total - item.price > 0) ? this.total - item.price : 0;
      }
    }

    if (this.checkIfEmpty()) this.empty = true;
  }

  private checkIfEmpty() : boolean{
    let counter = 0;
    for (let item of this.items) {
      if (item > 0) counter++;
    }

    return (counter == Object.keys(this.items).length);
  }
}
