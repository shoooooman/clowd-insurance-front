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
        console.log(ids);
        const id = ids[0] || 'abc';
        const insId = Math.floor(Math.random() * 10000000).toString();
        this.insuranceService.doc(insId).set({
          userId: id,
          kind: this.model.kind,
          start: this.model.start,
          finish: this.model.finish
        }).then(v => {
          const web3 = this.web3Service.web3;
          const insurance = new Insurance({id: insId, kind: this.model.kind});
          console.log(this.web3Service.contract);
          console.log(id)
          // this.web3Service.contract.methods.makeInsurance(insurance.deposit, insurance.payment, insId, this.model.start.getSeconds(), this.model.finish.getSeconds()).send({
          this.web3Service.contract.methods.makeInsurance(100, 200, insId, this.model.start.getSeconds(), this.model.finish.getSeconds()+10000000).send({
              from: id,
              value: 100
          }, (err, res) => {
              console.log("debug");
              console.error(err);
              console.error(res);
          });
          this.angularFireStorage.upload(insId, this.file);
        });
      });
    }
  }

}
