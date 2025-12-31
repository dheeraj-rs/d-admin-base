export const getCurrentUser = () => {
  return { name: 'Demo Admin', role: 'owner', email: 'admin@demo.com' };
};

export const authFetch = async (url: string, options: RequestInit = {}) => {
  return fetch(url, options);
};
