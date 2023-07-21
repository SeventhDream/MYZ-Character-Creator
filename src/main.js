import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';
import createPersistedState from 'vuex-persistedstate'; // Import the package

const app = createApp(App);
app.use(router);
app.use(store); // Do not pass createPersistedState() here

// Create the persisted state plugin instance
const persistedState = createPersistedState({
  // Options for the persisted state plugin
  // For example, you can specify which state to persist and other configurations here
  key: '1#z^8E&%xW@2*7Q!sDo!@pA$', // Specify a unique key for the storage
  paths: ['user'], // Provide an array of state properties to sync with local storage

});



// Load user data from localStorage into the Vuex store
const user = localStorage.getItem('1#z^8E&%xW@2*7Q!sDo!@pA$');
if (user) {
    console.log("Found User: " + user);
  store.commit('setUser', JSON.parse(user).user);
}
app.use(store);

// Use the persisted state plugin on the store
persistedState(store);

app.mount('#app');
