import {Component, OnInit} from '@angular/core';
import {Insurance} from '../insurance';
import {InsuranceService} from '../insurance.service';

@Component({
    selector: 'app-insurance-list',
    templateUrl: './insurance-list.component.html',
    styleUrls: ['./insurance-list.component.css']
})
export class InsuranceListComponent implements OnInit {

    insurances = [];

    constructor(
        private insuranceService: InsuranceService
    ) {
    }

    ngOnInit() {
        this.insuranceService.get().subscribe(insrances => {
            this.insurances = insrances.docs.map(doc => {
                const data = doc.data();
                const start = new Date(data.start.seconds);
                const finish = new Date(data.finish.seconds);
                console.log(data);
                return new Insurance({id: doc.id, kind: data.kind, status: data.status, start, finish});
            });
            console.log(this.insurances);
        });
    }

}
