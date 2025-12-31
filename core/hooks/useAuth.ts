export const useAuth = () => {
  return {
    user: { name: 'Demo Admin', role: 'owner', email: 'admin@demo.com' },
    loading: false,
    isAuthenticated: true,
  };
};
