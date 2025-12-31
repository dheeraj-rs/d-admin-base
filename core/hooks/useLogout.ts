export const useLogout = () => {
  return {
    logout: async () => {
      console.log('Logging out...');
      window.location.href = '/login';
    },
  };
};
