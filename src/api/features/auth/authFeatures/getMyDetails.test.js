import getMyDetails from './getMyDetails';

describe('getMyDetails', () => {
  it('should throw an error if email is missing', async () => {
    const userRepository = {
      findByEmail: jest.fn()
    };

    await expect(getMyDetails(null, userRepository)).rejects.toThrow('email could not be found from authentication token.');
  });

  it('should throw an error if user is not found', async () => {
    const userRepository = {
      findByEmail: jest.fn().mockReturnValue(null)
    };

    await expect(getMyDetails('email', userRepository)).rejects.toThrow('User was not found via the authentication token.');
  });

  it('should return user data if user is found', async () => {
    const userRepository = {
      findByEmail: jest.fn().mockReturnValue({email: 'email', firstname: 'firstname', surname: 'surname'})
    };

    const result = await getMyDetails('email', userRepository);

    expect(result).toEqual({email: 'email', firstname: 'firstname', surname: 'surname'});
  });
});