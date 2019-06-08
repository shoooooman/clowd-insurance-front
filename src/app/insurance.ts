export const depositSettings = [
    {
        id: 0,
        name: 'PC',
        deposit: 100,
        payment: 200,
    },
    {
        id: 1,
        name: 'スマートフォン',
        deposit: 200,
        payment: 300,
    },
    {
        id: 2,
        name: '車',
        deposit: 300,
        payment: 500,
    },
];


export class Insurance {
    id: any;
    kind: number;
    span: number;
    status: boolean;
    start: Date;
    finish: Date;
    name: string;
    deposit: number;
    payment: number;

    constructor(values: { id?, kind?, status?: boolean, start?: Date, finish?: Date } = {}) {
        this.id = values.id;
        this.kind = values.kind;
        this.status = values.status;
        this.start = values.start || new Date();
        this.finish = values.finish || new Date(Date.now() + 24 * 60 * 60 * 1000);
        if (this.kind !== undefined) {
            this.name = depositSettings[this.kind].name;
        }
        if (this.kind !== undefined) {
            this.payment = depositSettings[this.kind].payment;
        }
        if (this.kind !== undefined) {
            this.deposit = depositSettings[this.kind].deposit;
        }
    }


    doChallenge() {
        this.status = true;
    }

    isChallenging() {
        return this.status;
    }
}


export const insurances = [
    new Insurance(
        {
            id: '0',
            kind: 0,
            status: false
        }),
    new Insurance(
        {
            id: '1',
            kind: 1,
            status: false
        }
    ),
    new Insurance(
        {
            id: '2',
            kind: 2,
            status: true
        }
    )
];
