export class User {
  id?: number | null;
  firstName: string;
  lastName: string;
  email: string;

  constructor(data: any) {
    this.id = data.id ? data.id : null;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.email = data.email;
  }
}
