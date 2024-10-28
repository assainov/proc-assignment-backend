import login from './authFeatures/login.js';
import signup from './authFeatures/signup.js';

export default (userRepository, encryptionService, tokenService) => {

  const loginHandler = async (req, res) => {
    const {email, password} = req.body;

    const userDetails = await login(email, password, userRepository, encryptionService, tokenService);

    return res.status(200).json(userDetails);
  };

  const signupHandler = async (req, res) => {
    const {firstname, surname, email, password} = req.body;

    const userDetails = await signup(firstname, surname, email, password, userRepository, encryptionService, tokenService);

    res.status(200).json(userDetails);
  };

  const meHandler = async (req, res) =>
  // const {email, password} = req.body;

  // const token = login(email, password, userRepository);

    res.status(200).json({message: 'me'})
  ;

  return {
    loginHandler,
    signupHandler,
    meHandler
  };
};