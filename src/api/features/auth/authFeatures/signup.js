import {ClientError, ServerError} from '../../../entities/errors.js';

export default async (firstname, surname, email, password, userRepository, encryptionService, tokenService) => {
  if (!firstname || !surname || !email || !password) {
    throw new ClientError('Ensure that all fields are filled: firstname, surname, email, password');
  }

  const userExists = await userRepository.findByEmail(email);

  if (userExists) throw new ClientError('User already exists');

  const hashedPassword = await encryptionService.hashPassword(password);

  const user = await userRepository.create(firstname, surname, email, hashedPassword);

  if (!user) throw new ServerError('User not created. Try again later.');

  return {
    email: user.email,
    firstname: user.firstname,
    surname: user.surname,
    token: tokenService.generateToken(user.email)
  };
};