import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Insurance, insurances} from '../insurance';

@Component({
  selector: 'app-insurance-detail',
  templateUrl: './insurance-detail.component.html',
  styleUrls: ['./insurance-detail.component.css']
})
export class InsuranceDetailComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute
  ) {
  }

  insurance: Insurance;

  src;

  onInput(event) {
    if (event.target.files) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const url = e.target.result;
        this.src = url;
      };
      reader.readAsDataURL(file);
    }
  }

  submit() {
    window.alert('保証申請をしますか？');
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(param => {
      const id = param.get('id');
      this.insurance = insurances.find(insurance => {
        return insurance.id === id;
      });
    });
  }

}
