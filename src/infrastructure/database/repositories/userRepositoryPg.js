import dataSource from '../data-source.js';
import {UserEntity} from '../entities/userEntity.js';

const userRepository = dataSource.getRepository(UserEntity);

/**
 * User Repository Service
 * 
 * Provides methods to interact with the user repository in a PostgreSQL database.
 * 
 * @module userRepositoryPg
 */
export default () => {
  /**
   * Finds a user by their email address.
   * 
   * @async
   * @function findByEmail
   * @param {string} email - The email address of the user to find.
   * @returns {Promise<Object|null>} The user object if found, otherwise null.
   */
  const findByEmail = async (email) =>
    await userRepository.findOneBy({email});

  /**
   * Creates a new user in the repository.
   * 
   * @async
   * @function create
   * @param {string} firstname - The first name of the user.
   * @param {string} surname - The surname of the user.
   * @param {string} email - The email address of the user.
   * @param {string} hashedPassword - The hashed password of the user.
   * @returns {Promise<Object>} The created user object.
   */
  const create = async (firstname, surname, email, hashedPassword) =>
    await userRepository.save(userRepository.create({firstname, surname, email, hashedPassword}));

  return {
    findByEmail,
    create
  };
};