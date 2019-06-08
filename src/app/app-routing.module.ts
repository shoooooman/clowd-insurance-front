import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Route, RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {MetaSenderComponent} from './meta/meta-sender/meta-sender.component';
import {InsuranceDetailComponent} from './insurance-detail/insurance-detail.component';

const routes: Route[] = [
  {path: 'home', component: MetaSenderComponent},
  {path: 'insurance/:id', component: InsuranceDetailComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
