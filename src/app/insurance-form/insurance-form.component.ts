import {Component, OnInit} from '@angular/core';
import {InsuranceService} from '../insurance.service';
import {Web3Service} from '../util/web3.service';
import {depositSettings, Insurance} from '../insurance';
import {AngularFireStorage} from '@angular/fire/storage';
import {tap} from 'rxjs/operators';

@Component({
    selector: 'app-insurance-form',
    templateUrl: './insurance-form.component.html',
    styleUrls: ['./insurance-form.component.css']
})
export class InsuranceFormComponent implements OnInit {
    model = new Insurance(
        {
            kind: 0
        },
    );

    spans = [1, 2, 3, 4];

    kinds = depositSettings;
    url;
    file: File;

    constructor(
        private web3Service: Web3Service,
        private insuranceService: InsuranceService,
        private angularFireStorage: AngularFireStorage
    ) {
    }

    setUrl(url: string) {
        this.url = url;
    }

    getdonwload() {
        return this.angularFireStorage.ref('id').getDownloadURL().pipe(
            tap(url => {
                this.setUrl(url);
            })
        );
    }

    setFile(file: File) {
        this.file = file;
    }

    onFileInput(file: File) {
        this.setFile(file);
    }

    detail(id) {
        return this.kinds.find(kind => {
                return kind.id == id;
            }
        );
    }

    ngOnInit() {
    }

    onSubmit() {
        if (window.confirm('保険を申請しますか')) {
            this.web3Service.getAccounts().then(ids => {
                const id = ids[0] || 'abc';
                this.insuranceService.add({
                    userId: id,
                    kind: this.model.kind,
                    start: this.model.start,
                    finish: this.model.finish
                }).then(v => {
                    this.angularFireStorage.upload(v.id, this.file);
                });
            });
        }
    }

}
