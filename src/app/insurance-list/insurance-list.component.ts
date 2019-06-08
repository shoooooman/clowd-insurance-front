import {Component, OnInit} from '@angular/core';
import {insurances} from '../insurance';
import {AngularFirestore} from '@angular/fire/firestore';
import {InsuranceService} from '../insurance.service';

@Component({
  selector: 'app-insurance-list',
  templateUrl: './insurance-list.component.html',
  styleUrls: ['./insurance-list.component.css']
})
export class InsuranceListComponent implements OnInit {

  insurances = insurances;

  constructor(
    private insuranceService: InsuranceService
  ) {
  }

  ngOnInit() {
    this.insuranceService.get().subscribe(a => {
      a.docs.forEach(doc => {
        console.log(doc);
      });
    });
  }

}
