export class Insurance {
  id: any;
  key: string;
  price: number;
  back: number;
  span: number;
  status: boolean;

  constructor(values: {id, key, price, back, span, status}) {
    this.id = values.id;
    this.key = values.key;
    this.price = values.price;
    this.back = values.back;
    this.span = values.span;
    this.status = values.status;
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
      key: 'スマートフォン',
      price: 100,
      back: 200,
      span: 3,
      status: false
    }),
  new Insurance(
    {
      id: '1',
      key: 'パソコン',
      price: 200,
      back: 500,
      span: 2,
      status: false
    }
  ),
  new Insurance(
    {
      id: '2',
      key: 'パソコン',
      price: 200,
      back: 500,
      span: 2,
      status: true
    }
  )
];
