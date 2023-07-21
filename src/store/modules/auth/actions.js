// actions.js
export default {
  // Action to set the user data using the "setUser" mutation
  async setUser({ commit }, user) {
    try {
      commit('setUser', user); // Commit the mutation immediately without any delay
    } catch (error) {
      console.error('An error occurred while setting the user:', error);
    }
  },

  // Add more actions here if needed
};
