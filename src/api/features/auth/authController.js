import getMyDetails from './authFeatures/getMyDetails.js';
import login from './authFeatures/login.js';
import signup from './authFeatures/signup.js';

/**
 * Authentication Controller
 * 
 * @param {Object} userRepository - Repository for user data operations.
 * @param {Object} encryptionService - Service for handling encryption operations.
 * @param {Object} tokenService - Service for handling token operations.
 * @returns {Object} Handlers for authentication routes.
 */

export default (userRepository, encryptionService, tokenService) => {

  /**
   * Handles user login.
   * 
   * @async
   * @function loginHandler
   * @param {Object} req - Express request object.
   * @param {Object} req.body - Request body.
   * @param {string} req.body.email - User's email.
   * @param {string} req.body.password - User's password.
   * @param {Object} res - Express response object.
   * @returns {Promise<void>} Responds with user details.
   */
  const loginHandler = async (req, res) => {
    const {email, password} = req.body;

    const userDetails = await login(email, password, userRepository, encryptionService, tokenService);

    return res.status(200).json(userDetails);
  };

  /**
   * Handles user signup.
   * 
   * @async
   * @function signupHandler
   * @param {Object} req - Express request object.
   * @param {Object} req.body - Request body.
   * @param {string} req.body.firstname - User's first name.
   * @param {string} req.body.surname - User's surname.
   * @param {string} req.body.email - User's email.
   * @param {string} req.body.password - User's password.
   * @param {Object} res - Express response object.
   * @returns {Promise<void>} Responds with user details.
   */
  const signupHandler = async (req, res) => {
    const {firstname, surname, email, password} = req.body;

    const userDetails = await signup(firstname, surname, email, password, userRepository, encryptionService, tokenService);

    res.status(200).json(userDetails);
  };

  /**
   * Handles fetching the authenticated user's details.
   * 
   * @async
   * @function meHandler
   * @param {Object} req - Express request object.
   * @param {Object} req.user - Authenticated user object.
   * @param {string} req.user.email - Authenticated user's email.
   * @param {Object} res - Express response object.
   * @returns {Promise<void>} Responds with user details.
   */
  const meHandler = async (req, res) => {
    const {email} = req.user; // user is attached to req by the authenticate middleware

    const userDetails = await getMyDetails(email, userRepository);

    res.status(200).json(userDetails);
  };

  return {
    loginHandler,
    signupHandler,
    meHandler
  };
};