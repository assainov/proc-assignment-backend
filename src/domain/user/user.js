export default class User {
  constructor(
    firstname,
    surname,
    email,
    hashedPassword
  ) {
    this.firstname = firstname;
    this.surname = surname;
    this.email = email;
    this.hashedPassword = hashedPassword;
  }
}