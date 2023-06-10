import * as bcrypt from 'bcrypt';
export function encodePassword(rawPassword: string) {
  const SALT = bcrypt.genSaltSync();
  const hashedPwd = bcrypt.hashSync(rawPassword, SALT);
  return hashedPwd;
}
export function comparePassword(rawPwd: string, hashedPwd: string) {
  return bcrypt.compareSync(rawPwd, hashedPwd);
}
