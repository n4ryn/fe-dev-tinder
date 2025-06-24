// Get Cookie
export const getCookie = name => {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(";");

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }

  return null;
};

// Get User
export const getUser = () => {
  const userStr = getCookie("user");
  const user = userStr ? JSON.parse(decodeURIComponent(userStr)) : null;

  return user;
};
