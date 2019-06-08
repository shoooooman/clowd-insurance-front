import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Route, RouterModule} from '@angular/router';
import {InsuranceDetailComponent} from './insurance-detail/insurance-detail.component';
import {InsuranceFormComponent} from './insurance-form/insurance-form.component';
import {InsuranceListComponent} from './insurance-list/insurance-list.component';
import {VoteComponent} from './vote/vote.component';
import {ChallengeListComponent} from './challenge-list/challenge-list.component';

const routes: Route[] = [
    {path: '', component: InsuranceFormComponent},
    {path: 'insurance/new', component: InsuranceFormComponent},
    {path: 'insurances', component: InsuranceListComponent},
    {path: 'insurance/:id', component: InsuranceDetailComponent},
    {path: 'challenges', component: ChallengeListComponent},
    {path: 'vote', component: VoteComponent},
    {path: '', component: VoteComponent}
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
export class AppRoutingModule {
}
