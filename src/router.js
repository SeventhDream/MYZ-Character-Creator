import { createRouter, createWebHistory } from "vue-router";
import Login from './pages/LogIn.vue';
import Signup from './pages/SignUp.vue';
import CharacterViewer from "./pages/CharacterViewer.vue";
import CharacterCreator from "./pages/CharacterCreator.vue";
const routes = [
    {path: '/login', component: Login },
    {path: '/signup', component: Signup},
    {path: '/character-viewer', component: CharacterViewer, props: true, },
    {path: '/character-creator', component: CharacterCreator},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;