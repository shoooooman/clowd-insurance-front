import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-challenge-list',
  templateUrl: './challenge-list.component.html',
  styleUrls: ['./challenge-list.component.css']
})
export class ChallengeListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

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
  ]

}
