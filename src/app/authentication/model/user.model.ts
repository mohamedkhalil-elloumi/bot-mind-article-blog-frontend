export class User {
  id?: number | null;
  firstName: string;
  lastName: string;
  email: string;

  constructor(data: any) {
    if (data.id) {
      this.id = data.id;
    } else {
      this.id = null;
    }
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.email = data.email;
  }
}
