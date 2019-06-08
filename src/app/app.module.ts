import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {MetaModule} from './meta/meta.module';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatToolbarModule} from '@angular/material';
import {AppRoutingModule} from './app-routing.module';
import {InsuranceFormComponent} from './insurance-form/insurance-form.component';
import {VoteComponent} from './vote/vote.component';
import {InsuranceListComponent} from './insurance-list/insurance-list.component';
import {InsuranceDetailComponent} from './insurance-detail/insurance-detail.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {NgMatShareModule} from './ng-mat-share.module';
import {FileFieldComponent} from './file-field/file-field.component';
import {FileSrcDirective} from './file-field/directive/file-src.directive';
import {FileInputDirective} from './file-field/directive/file-input.directive';
import {AngularFireStorage, AngularFireStorageModule} from '@angular/fire/storage';
import { ChallengeListComponent } from './challenge-list/challenge-list.component';


@NgModule({
    declarations: [
        AppComponent,
        VoteComponent,
        InsuranceFormComponent,
        InsuranceListComponent,
        InsuranceDetailComponent,
        FileFieldComponent,
        FileSrcDirective,
        FileInputDirective,
      ChallengeListComponent
    ],
    imports: [
        BrowserAnimationsModule,
        CommonModule,
        AppRoutingModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatToolbarModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        MetaModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireStorageModule,
        NgMatShareModule,

    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
