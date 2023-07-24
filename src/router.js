import { createRouter, createWebHistory } from "vue-router";
import Login from './pages/LogIn.vue';
import Signup from './pages/SignUp.vue';
import CharacterViewer from "./pages/CharacterViewer.vue";
import CharacterCreator from "./pages/CharacterCreator.vue";
import Home from "./pages/LandingPage.vue";
import store from './store/store';
import UserInfo from './pages/UserInfo';

const routes = [
    { path: "/", component: Home },
    { path: '/login', component: Login },
    { path: '/signup', component: Signup },
    {
        path: '/character-viewer',
        component: CharacterViewer,
        props: true,
        beforeEnter: (to, from, next) => {
            const isAuthenticated = store.state.user !== null;
          if (isAuthenticated) {
                next(); // Proceed to the route
            } else {
                next('/login'); // Redirect the user to the login page
            }
        },
    },
    { path: '/character-creator', component: CharacterCreator },
    {
        path: '/user-bio',
        component: UserInfo,
        props: true,
        beforeEnter: (to, from, next) => {
            const isAuthenticated = store.state.user !== null;
          if (isAuthenticated) {
                next(); // Proceed to the route
            } else {
                next('/login'); // Redirect the user to the login page
            }
        },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
})




export default router;