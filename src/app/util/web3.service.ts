import {Injectable} from '@angular/core';
import contract from 'truffle-contract';
import {Subject} from 'rxjs';

declare let require: any;
const Web3 = require('web3');


declare let window: any;

@Injectable()
export class Web3Service {
  public ready = false;
  public accountsObservable = new Subject<string[]>();
  public web3: any;
  public contract: any;
  private accounts: string[];

  constructor() {
    window.addEventListener('load', (event) => {
      setTimeout(() => {
        this.bootstrapWeb3();
      }, 10);
    });
  }

  getAccounts(): Promise<string[]> {
    return this.web3.eth.getAccounts();
  }

  public bootstrapWeb3() {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    const provider = ('ethereum' in window) ? window['ethereum'] : Web3.givenProvider;
    console.log(window['ethereum']);
    console.log(Web3.givenProvider);
    console.log(new Web3(provider));
    this.web3 = new Web3(provider);
    this.web3.currentProvider.enable();
    this.contract = new this.web3.eth.Contract([
      {
        'constant': false,
        'inputs': [
          {
            'name': 'applicant',
            'type': 'address'
          },
          {
            'name': 'id',
            'type': 'uint256'
          }
        ],
        'name': 'challengeRequest',
        'outputs': [],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'constant': false,
        'inputs': [
          {
            'name': 'applicant',
            'type': 'address'
          },
          {
            'name': 'id',
            'type': 'uint256'
          }
        ],
        'name': 'checkOutApplicant',
        'outputs': [],
        'payable': true,
        'stateMutability': 'payable',
        'type': 'function'
      },
      {
        'constant': false,
        'inputs': [
          {
            'name': 'deposit',
            'type': 'uint256'
          },
          {
            'name': 'payment',
            'type': 'uint256'
          },
          {
            'name': 'id',
            'type': 'uint256'
          },
          {
            'name': 'startedFrom',
            'type': 'uint256'
          },
          {
            'name': 'finishedAt',
            'type': 'uint256'
          }
        ],
        'name': 'makeInsurance',
        'outputs': [],
        'payable': true,
        'stateMutability': 'payable',
        'type': 'function'
      },
      {
        'constant': false,
        'inputs': [
          {
            'name': 'applicant',
            'type': 'address'
          },
          {
            'name': 'id',
            'type': 'uint256'
          }
        ],
        'name': 'voteNoTo',
        'outputs': [],
        'payable': true,
        'stateMutability': 'payable',
        'type': 'function'
      },
      {
        'constant': false,
        'inputs': [
          {
            'name': 'applicant',
            'type': 'address'
          },
          {
            'name': 'id',
            'type': 'uint256'
          }
        ],
        'name': 'voteYesTo',
        'outputs': [],
        'payable': true,
        'stateMutability': 'payable',
        'type': 'function'
      },
      {
        'constant': false,
        'inputs': [
          {
            'name': 'applicant',
            'type': 'address'
          },
          {
            'name': 'id',
            'type': 'uint256'
          }
        ],
        'name': 'withdrawVoter',
        'outputs': [],
        'payable': true,
        'stateMutability': 'payable',
        'type': 'function'
      },
      {
        'inputs': [],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'constructor'
      },
      {
        'constant': true,
        'inputs': [],
        'name': 'amount',
        'outputs': [
          {
            'name': '',
            'type': 'uint256'
          }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
      },
      {
        'constant': true,
        'inputs': [],
        'name': 'challengePeriod',
        'outputs': [
          {
            'name': '',
            'type': 'uint256'
          }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
      },
      {
        'constant': true,
        'inputs': [],
        'name': 'owner',
        'outputs': [
          {
            'name': '',
            'type': 'address'
          }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
      },
      {
        'constant': true,
        'inputs': [],
        'name': 'voteFee',
        'outputs': [
          {
            'name': '',
            'type': 'uint256'
          }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
      }
    ], '0x16Bc554e4Ae25282B04c6dC825699a1302260745');

    // if (typeof window.web3 !== 'undefined') {
    //   // Use Mist/MetaMask's provider
    //   this.web3 = new Web3(window.web3.currentProvider);
    // } else {
    //   console.log('No web3? You should consider trying MetaMask!');
    //
    //
    //
    //   // Hack to provide backwards compatibility for Truffle, which uses web3js 0.20.x
    //   Web3.providers.HttpProvider.prototype.sendAsync = Web3.providers.HttpProvider.prototype.send;
    //   // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
       this.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    // }

    setInterval(() => this.refreshAccounts(), 100);
  }

  public async artifactsToContract(artifacts) {
    if (!this.web3) {
      const delay = new Promise(resolve => setTimeout(resolve, 100));
      await delay;
      return await this.artifactsToContract(artifacts);
    }

    const contractAbstraction = contract(artifacts);
    contractAbstraction.setProvider(this.web3.currentProvider);
    return contractAbstraction;

  }

  private refreshAccounts() {
    this.web3.eth.getAccounts((err, accs) => {
      console.log('Refreshing accounts');
      if (err != null) {
        console.warn('There was an error fetching your accounts.');
        return;
      }

      // Get the initial account balance so it can be displayed.
      if (accs.length === 0) {
        console.warn('Couldn\'t get any accounts! Make sure your Ethereum client is configured correctly.');
        return;
      }

      if (!this.accounts || this.accounts.length !== accs.length || this.accounts[0] !== accs[0]) {
        console.log('Observed new accounts');

        this.accountsObservable.next(accs);
        this.accounts = accs;
      }

      this.ready = true;
    });
  }
}
