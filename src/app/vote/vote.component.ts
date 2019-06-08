import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {

  constructor() { }
  ngOnInit() {
  }

  applicantName = '保険太郎'
  insuranceType = 'スマートフォン'
  deadline = '2019/06/08'

  depositFee = 0.01
}
