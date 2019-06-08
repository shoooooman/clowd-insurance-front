import {Component, OnInit} from '@angular/core';
import {Insurance} from '../insurance';
import {AngularFireStorage} from '@angular/fire/storage';
import {tap} from 'rxjs/operators';
import {InsuranceService} from '../insurance.service';

@Component({
    selector: 'app-challenge-list',
    templateUrl: './challenge-list.component.html',
    styleUrls: ['./challenge-list.component.css']
})
export class ChallengeListComponent implements OnInit {


    insurances: Insurance[];
    challenges = [
        {
            challenger: '保険太郎',
            key: 'スマートフォン',
            back: '200',
            deadline: '2019/06/08'
        },
        {
            challenger: '保険太郎',
            key: 'PC',
            back: '500',
            deadline: '2019/06/08'
        },
        {
            challenger: '保険太郎',
            key: 'スマートフォン',
            back: '500',
            deadline: '2019/06/08'
        }
    ];

    srces: string[] = [];
    srcesAfter: string[] = [];

    constructor(
        private insuranceService: InsuranceService,
        private angularFireStorage: AngularFireStorage
    ) {
    }

    ngOnInit() {
        this.insuranceService.get().subscribe(insrances => {
            this.insurances = insrances.docs.map(doc => {
                const data = doc.data();
                const start = new Date(data.start.seconds);
                const finish = new Date(data.finish.seconds);
                this.angularFireStorage.ref(doc.id).getDownloadURL().pipe(
                    tap(url => {
                        this.srces.push(url);
                    })
                ).subscribe();
                this.angularFireStorage.ref(doc.id + 'after').getDownloadURL().pipe(
                    tap(url => {
                        this.srcesAfter.push(url);
                    })
                ).subscribe();
                return new Insurance({id: doc.id, kind: data.kind, status: data.status, start, finish});
            });
            console.log(this.insurances);
        });
    }

}
