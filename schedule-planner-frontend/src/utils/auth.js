export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  try {
    if (!token) return false;

    // Optional: decode token if it's JWT
    const payload = JSON.parse(atob(token.split('.')[1]));
    const isExpired = payload.exp * 1000 < Date.now();
    return !isExpired;
  } catch (err) {
    return false;
  }
};
