// mutations.js
// Mutations are responsible for updating the state
import { saveStorage } from '../../../storageUtils';
import DOMPurify from 'dompurify';

export default {
    // Mutation to set the user data in the state
    setUser(state, user) {
      const sanitizedUser = DOMPurify.sanitize(user);
      state.user = sanitizedUser;
      saveStorage('user', sanitizedUser);
    },
    setAccessToken(state, accessToken) {
      const sanitizedAccessToken = DOMPurify.sanitize(accessToken);
      state.user.accessToken = sanitizedAccessToken;
      saveStorage('accessToken', sanitizedAccessToken);
    },
    setRefreshToken(state, refreshToken) {
      const sanitizedRefreshToken = DOMPurify.sanitize(refreshToken);
      state.user.refreshToken = sanitizedRefreshToken;
      saveStorage('refreshToken', sanitizedRefreshToken);
    },
    
    // Add more mutations here if needed
  };
  