import {Component, OnInit} from '@angular/core';
import {insurances} from '../insurance';

@Component({
  selector: 'app-insurance-list',
  templateUrl: './insurance-list.component.html',
  styleUrls: ['./insurance-list.component.css']
})
export class InsuranceListComponent implements OnInit {

  insurances = insurances;

  constructor() {
  }

  ngOnInit() {
  }

}
