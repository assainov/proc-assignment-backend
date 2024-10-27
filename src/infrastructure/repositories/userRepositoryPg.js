export default () => {
  const findByEmail = (params) => {
    console.log('hello', params);

    return 'hello';
  };

  const findById = (id) => {
    console.log('hello', id);
  };

  const add = (userEntity) => {
    console.log('hello', userEntity);
  };

  return {
    findByEmail,
    findById,
    add
  };
};