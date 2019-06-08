import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Insurance} from '../insurance';
import {InsuranceService} from '../insurance.service';
import {tap} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
    selector: 'app-insurance-detail',
    templateUrl: './insurance-detail.component.html',
    styleUrls: ['./insurance-detail.component.css']
})
export class InsuranceDetailComponent implements OnInit {

    insurance: Insurance;
    src;
    file: File;

    submittedUrl: string;

    constructor(
        private activatedRoute: ActivatedRoute,
        private insuranceService: InsuranceService,
        private angularFireStorage: AngularFireStorage,
    ) {
    }

    onInput(event) {
        if (event.target.files) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = (e: any) => {
                const url = e.target.result;
                this.src = url;
            };
            this.file = file;
            reader.readAsDataURL(file);
        }
    }

    submit() {
        if (window.confirm('保証申請をしますか？')) {
            this.insuranceService.set(this.insurance.id, {status: true}).then(v => {
                this.angularFireStorage.ref(this.insurance.id + 'after').put(this.file);
            });
        }
    }

    ngOnInit() {
        this.activatedRoute.paramMap.subscribe(param => {
            const id = param.get('id');
            this.angularFireStorage.ref(id).getDownloadURL().pipe(
                tap(url => {
                    this.submittedUrl = url;
                })
            ).subscribe();
            this.insuranceService.doc(id).get().subscribe(docRef => {
                const data = docRef.data();
                const start = new Date(data.start.seconds);
                const finish = new Date(data.finish.seconds);
                this.insurance = new Insurance({id: docRef.id, kind: data.kind, status: data.status, start, finish});
                if (this.insurance.status) {
                    console.log(this.insurance.id);
                    this.angularFireStorage.ref(this.insurance.id + 'after').getDownloadURL().subscribe(url => {
                        this.src = url;
                    });
                }
            });
        });
    }

}
