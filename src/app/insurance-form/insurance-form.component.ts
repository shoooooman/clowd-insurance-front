import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-insurance-form',
  templateUrl: './insurance-form.component.html',
  styleUrls: ['./insurance-form.component.css']
})
export class InsuranceFormComponent implements OnInit {
  model = {
    a: 1,
    b: 2,
    kind: 1,
    span: 1
  };

  spans = [1, 2, 3, 4];

  kinds = [
    {
      key: 'スマートフォン', value: 0, data: {
        price: 100,
        back: 200
      }
    },
    {
      key: 'パソコン', value: 1, data: {
        price: 200,
        back: 500
      }
    }
  ];


  detail(value) {
    return this.kinds.find(kind => {
        return kind.value.toString() === value.toString();
      }
    ).data;
  }

  constructor() {
  }

  ngOnInit() {
  }

  onSubmit() {
    window.alert('保険を申請しますか？');
  }

}
