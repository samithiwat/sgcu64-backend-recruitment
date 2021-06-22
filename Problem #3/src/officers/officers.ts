export class Officer {
  uid: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  salary: number;

  constructor(attrs: Officer) {
    Object.assign(this, attrs);
  }
}
