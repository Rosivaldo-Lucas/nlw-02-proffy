import bcrypt from 'bcryptjs';

const encryptPassword = async (password: string) => {
  const passwordHash = await bcrypt.hash(password, 10);

  return passwordHash;
}

const checkPassword = async (password: string, passwordHash: string) => {
  const passwordMatch =  await bcrypt.compare(password, passwordHash);

  return passwordMatch;
}

export {
  encryptPassword,
  checkPassword,
};
