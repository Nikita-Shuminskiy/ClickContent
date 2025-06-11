export const getHasChangeNickName = (nickname: string): boolean => {
  if (!nickname) return false;
  const regexp = /user[0-9]{17}/;
  return !regexp.test(nickname);
};
