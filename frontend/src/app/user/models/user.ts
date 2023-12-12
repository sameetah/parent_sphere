export class User {
  public id: number;
  public firstName: string;
  public lastName: string;
  public username: string;
  public email: string;
  public password: string;
  public profileImageUrl: string;

  public role: string;
  public authorities: [];

  constructor() {
    this.id = 0;
    this.firstName = '';
    this.lastName = '';
    this.username = '';
    this.email = '';

    this.profileImageUrl = '';
    this.password = '';
    this.role = '';
    this.authorities = [];
  }
}
