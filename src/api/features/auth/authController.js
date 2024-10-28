import login from './authFeatures/login.js';

export default (userRepository) => {

  const loginHandler = async (req, res) => {
    const {email, password} = req.body;

    const token = login(email, password, userRepository);

    return res.status(200).json({token});
  };

  return {
    loginHandler
  };
};