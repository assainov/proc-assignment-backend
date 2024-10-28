import jwt from 'jsonwebtoken';

export default () => ({
  generateToken: (email) => {
    if (!email) {
      throw new Error('email cannot be empty');
    }

    const token = jwt.sign({email}, process.env.JWT_SECRET, {expiresIn: '24h'});

    return token;
  },
});