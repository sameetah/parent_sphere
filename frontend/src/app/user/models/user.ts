export class User {
  public userId: string;
  public firstName: string;
  public lastName: string;
  public username: string;
  public email: string;

  public profileImageUrl: string;

  public role: string;
  public authorities: [];

  constructor() {
    this.userId = '';
    this.firstName = '';
    this.lastName = '';
    this.username = '';
    this.email = '';

    this.profileImageUrl = '';

    this.role = '';
    this.authorities = [];
  }
}
