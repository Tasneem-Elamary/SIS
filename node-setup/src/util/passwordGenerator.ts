export const passwordGenerator = ():string => {
  const passlength = 12;
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+';
  let password = '';
  for (let i = 0; i < passlength; i += 1) {
    const randomindex = Math.floor(Math.random() * charset.length);
    password += charset[randomindex];
  }
  return password;
};
