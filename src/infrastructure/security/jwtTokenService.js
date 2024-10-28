import jwt from 'jsonwebtoken';

/**
 * JWT Token Service
 * 
 * This service provides functionality to generate JWT tokens.
 * 
 * @returns {Object} An object containing the generateToken function.
 * 
 * @function generateToken
 * @param {string} email - The email for which the token is generated.
 * @throws {Error} Throws an error if the email is empty.
 * @returns {string} The generated JWT token.
 */
export default () => ({
  generateToken: (email) => {
    if (!email) {
      throw new Error('email cannot be empty');
    }

    const token = jwt.sign({email}, process.env.JWT_SECRET, {expiresIn: '24h'});

    return token;
  },
});