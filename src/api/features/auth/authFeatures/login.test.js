import login from './login.js';

describe('login', () => {
  it('should throw an error if email is missing', async () => {
    const userRepository = {
      findByEmail: jest.fn()
    };
    const encryptionService = {};
    const tokenService = {};

    await expect(login(null, 'password', userRepository, encryptionService, tokenService)).rejects.toThrow('Ensure that all fields are filled: email, password');
  });

  it('should throw an error if password is missing', async () => {
    const userRepository = {
      findByEmail: jest.fn()
    };
    const encryptionService = {};
    const tokenService = {};

    await expect(login('email', null, userRepository, encryptionService, tokenService)).rejects.toThrow('Ensure that all fields are filled: email, password');
  });

  it('should throw an error if user is not found', async () => {
    const userRepository = {
      findByEmail: jest.fn().mockReturnValue(null)
    };
    const encryptionService = {};
    const tokenService = {};

    await expect(login('email', 'password', userRepository, encryptionService, tokenService)).rejects.toThrow('Invalid email or password');
  });

  it('should throw an error if password does not match', async () => {
    const userRepository = {
      findByEmail: jest.fn().mockReturnValue({hashedPassword: 'hashedPassword'})
    };
    const encryptionService = {
      comparePassword: jest.fn().mockReturnValue(false)
    };
    const tokenService = {};

    await expect(login('email', 'password', userRepository, encryptionService, tokenService)).rejects.toThrow('Invalid email or password');
  });

  it('should return user data and token if login is successful', async () => {
    const userRepository = {
      findByEmail: jest.fn().mockReturnValue({email: 'email', firstname: 'firstname', surname: 'surname', hashedPassword: 'hashedPassword'})
    };
    const encryptionService = {
      comparePassword: jest.fn().mockReturnValue(true)
    };
    const tokenService = {
      generateToken: jest.fn().mockReturnValue('token')
    };

    const result = await login('email', 'password', userRepository, encryptionService, tokenService);

    expect(result).toEqual({email: 'email', firstname: 'firstname', surname: 'surname', token: 'token'});
  });
});