// store.js
import { createStore } from 'vuex';
import mutations from './modules/auth/mutations'; // Import mutations from separate file
import actions from './modules/auth/actions'; // Import actions from separate file

const store = createStore({
  state: {
    user: null, // Initial state to hold user data
  },
  mutations: mutations, // Use the imported mutations
  actions: actions, // Use the imported actions
});

export default store;
