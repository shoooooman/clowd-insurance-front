import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Route} from '@angular/router';
import {AppComponent} from './app.component';
import {MetaSenderComponent} from './meta/meta-sender/meta-sender.component';

const routes: Route[] = [
  {path: '/home', component: MetaSenderComponent},
  {path: '/home2', component: MetaSenderComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class AppRoutingModule { }
