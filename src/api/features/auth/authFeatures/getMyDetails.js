import {ServerError} from '../../../entities/errors.js';

export default async (email, userRepository) => {
  if (!email) {
    throw new ServerError('email could not be found from authentication token.');
  }

  const user = await userRepository.findByEmail(email);

  if (!user) throw new ServerError('User was not found via the authentication token.');

  return {
    email: user.email,
    firstname: user.firstname,
    surname: user.surname,
  };
};