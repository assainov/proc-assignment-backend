import {ClientError} from '../../../entities/errors.js';

export default async (email, password, userRepository, encryptionService, tokenService) => {
  if (!email || !password) {
    throw new ClientError('Ensure that all fields are filled: email, password');
  }

  const user = await userRepository.findByEmail(email);

  if (!user) throw new ClientError('Invalid email or password');

  const passwordMatches = await encryptionService.comparePassword(password, user.hashedPassword);

  if (!passwordMatches) throw new ClientError('Invalid email or password');

  return {
    email: user.email,
    firstname: user.firstname,
    surname: user.surname,
    token: tokenService.generateToken(user.email)
  };
};