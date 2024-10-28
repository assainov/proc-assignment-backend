import dataSource from '../data-source.js';
import {UserEntity} from '../entities/userEntity.js';

const userRepository = dataSource.getRepository(UserEntity);

export default () => {
  const findByEmail = async (email) =>
    await userRepository.findOneBy({email});

  const create = async (firstname, surname, email, hashedPassword) =>
    await userRepository.save(userRepository.create({firstname, surname, email, hashedPassword}));

  return {
    findByEmail,
    create
  };
};