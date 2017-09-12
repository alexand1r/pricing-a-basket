import {Component, OnInit} from '@angular/core';
import {GoodsService} from "../../services/goods.service";
import {BasketService} from "../../services/basket.service";
import {Item} from "../../data/item.interface";
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'pick',
  templateUrl: './pick.html'
})
export class PickComponent implements OnInit {
  items : Array<Item>;
  basket : any = {};

  constructor(
    private goods : GoodsService,
    private basketService : BasketService
  ) {}

  ngOnInit(): void {
    this.items = this.goods.getGoods();
    this.basket = this.basketService.items;
  }

  addItem(item : Item) {
    this.basketService.addItem(item);
  }

  removeItem(item : Item) {
    this.basketService.removeItem(item);
  }
}
