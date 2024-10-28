export default (email, password, userRepository) => {
  if (!email || !password) {
    // throw new AuthError('email and password fields cannot be empty');

    const error = new Error('email and password fields cannot be empty');
    throw error;
  }

  const user = userRepository.findByEmail({email});

  if (!user.length) {
    const error = new Error('Invalid email or password');
    throw error;
  }

  const generateToken = '123';

  return generateToken;
};