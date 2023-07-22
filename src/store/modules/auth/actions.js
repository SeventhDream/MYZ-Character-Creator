// actions.js

import router from '@/router'; // Import the Vue Router instance
import { clearStorage } from '../../../storageUtils';

export default {

  // Action to set the user data using the "setUser" mutation
  async setUser({ commit }, user) {
    try {
      commit('setUser', user); // Commit the mutation immediately without any delay
    } catch (error) {
      console.error('An error occurred while setting the user:', error);
    }
  },
  
  logout({ commit }) {
    // Clear the user data from the store and local storage
    commit('setUser', null);
    clearStorage('user');
    router.push('/login');
  },

  // Add more actions here if needed
};
