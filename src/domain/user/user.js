export default class User {
  constructor(
    id,
    firstName,
    lastName,
    email,
    createdAt,
    updatedAt,
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}