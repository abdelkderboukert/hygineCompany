// utils/auth.js
export const isAuthenticated = () => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; authToken=`);
  if (parts.length === 2) {
    return parts.pop().split(";").shift() === "authenticated";
  }
  return false;
};
