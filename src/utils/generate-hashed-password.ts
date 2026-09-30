import { hashPassword } from '../lib/login/manager-login';

void (async () => {
  const myPassword = '123456';
  const hashPasswordBase64 = await hashPassword(myPassword);

  console.log({ hashPasswordBase64 });
})();
