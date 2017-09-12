import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from "../components/home/home.component";
import {BasketComponent} from "../components/basket/basket.component";
import {PickComponent} from "../components/pick/pick.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'pick', component: PickComponent},
  {path: 'basket', component: BasketComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutesModule {}
