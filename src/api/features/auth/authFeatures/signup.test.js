import signup from './signup';

describe('signup', () => {
  it('should throw an error if email is missing', async () => {
    const userRepository = {
      findByEmail: jest.fn()
    };
    const encryptionService = {};
    const tokenService = {};

    await expect(signup(null, 'password', 'firstname', 'surname', userRepository, encryptionService, tokenService)).rejects.toThrow('Ensure that all fields are filled: firstname, surname, email, password');
  });

  it('should throw an error if password is missing', async () => {
    const userRepository = {
      findByEmail: jest.fn()
    };
    const encryptionService = {};
    const tokenService = {};

    await expect(signup('email', null, 'firstname', 'surname', userRepository, encryptionService, tokenService)).rejects.toThrow('Ensure that all fields are filled: firstname, surname, email, password');
  });

  it('should throw an error if firstname is missing', async () => {
    const userRepository = {
      findByEmail: jest.fn()
    };
    const encryptionService = {};
    const tokenService = {};

    await expect(signup('email', 'password', null, 'surname', userRepository, encryptionService, tokenService)).rejects.toThrow('Ensure that all fields are filled: firstname, surname, email, password');
  });

  it('should throw an error if surname is missing', async () => {
    const userRepository = {
      findByEmail: jest.fn()
    };
    const encryptionService = {};
    const tokenService = {};

    await expect(signup('email', 'password', 'firstname', null, userRepository, encryptionService, tokenService)).rejects.toThrow('Ensure that all fields are filled: firstname, surname, email, password');
  });

  it('should throw an error if user exists', async () => {
    const userRepository = {
      findByEmail: jest.fn().mockReturnValue({})
    };
    const encryptionService = {};
    const tokenService = {};

    await expect(signup('email', 'password', 'firstname', 'surname', userRepository, encryptionService, tokenService)).rejects.toThrow('User already exists');
  });

  it('should throw an error if user is not created', async () => {
    const userRepository = {
      findByEmail: jest.fn().mockReturnValue(null),
      create: jest.fn().mockReturnValue(null)
    };
    const encryptionService = {
      hashPassword: jest.fn().mockReturnValue('hashedPassword')
    };
    const tokenService = {};

    await expect(signup('email', 'password', 'firstname', 'surname', userRepository, encryptionService, tokenService)).rejects.toThrow('User not created. Try again later.');
  });

  it('should return user data and token if signup is successful', async () => {
    const userRepository = {
      findByEmail: jest.fn().mockReturnValue(null),
      create: jest.fn().mockReturnValue({email: 'email', firstname: 'firstname', surname: 'surname'})
    };
    const encryptionService = {
      hashPassword: jest.fn().mockReturnValue('hashedPassword')
    };
    const tokenService = {
      generateToken: jest.fn().mockReturnValue('token')
    };

    const result = await signup('email', 'password', 'firstname', 'surname', userRepository, encryptionService, tokenService);

    expect(result).toEqual({email: 'email', firstname: 'firstname', surname: 'surname', token: 'token'});
  });

});