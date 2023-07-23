// mutations.js
// Mutations are responsible for updating the state
import { saveStorage } from '../../../storageUtils';

export default {
    // Mutation to set the user data in the state
    setUser(state, user) {
      state.user = user;
      saveStorage('user', user);
    },
    setAccessToken(state, accessToken) {
      state.user.accessToken = accessToken;
      saveStorage('accessToken', accessToken);
    },
    setRefreshToken(state, refreshToken) {
      state.user.refreshToken = refreshToken;
      saveStorage('refreshToken', refreshToken);
    },
    
    // Add more mutations here if needed
  };
  