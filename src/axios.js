// axios.js
import axios from 'axios';
import store from './store/store'; // Update the path to your Vuex store file
import router from './router';

// Add an Axios request interceptor
axios.interceptors.request.use(
  function (config) {
    // Get the access token from the store
    const accessToken = store.state.user?.accessToken;

    // If the access token exists, add it to the request headers
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add an Axios response interceptor
axios.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    // Check if the error status is 401 (Unauthorized) and the original request was not a refresh token request
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh the access token
        const response = await axios.post('http://localhost:3000/api/refresh-token', null, {
          headers: {
            'x-refresh-token': store.state.user?.refreshToken,
          },
        });

        // If refresh token is successful, update the access token in the store and the Axios headers
        const newAccessToken = response.data.accessToken;
        const newRefreshToken = response.data.refreshToken;
        store.commit('setAccessToken', newAccessToken);
        store.commit('setRefreshToken', newRefreshToken);
        axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;

        // Retry the original request with the updated access token
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        // If refresh token fails, log out the user
        store.dispatch('logout');
        router.push('/login');
        return Promise.resolve();
      }
    }

    return Promise.reject(error);
  }
);

export default axios;
