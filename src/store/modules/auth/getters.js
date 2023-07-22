// frontend/store/modules/auth/getters.js

export default {
    isAccessTokenExpired: (state) => {
      // If the user object or access token is not available, consider it expired
      if (!state.user || !state.user.accessToken) {
        return true;
      }
  
      // Get the expiration date from the access token
      const expirationDate = new Date(state.user.accessTokenExpiration);
  
      // Check if the current date is after the expiration date
      return Date.now() >= expirationDate.getTime();
    },
  };