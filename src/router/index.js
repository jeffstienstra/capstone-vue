import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Parks from "../views/ParksIndex.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";
import Signup from "../views/Signup.vue";
import Favorites from "../views/Favorites.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", name: "Home", component: Home },

  // \/ route level code-splitting \/
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  { path: "/dinos", name: "Dinos", component: () => import(/* webpackChunkName: "about" */ "../views/Dinos.vue") },
  { path: "/parks", name: "parks", component: Parks },
  { path: "/login", name: "login", component: Login },
  { path: "/logout", name: "logout", component: Logout },
  { path: "/signup", name: "signup", component: Signup },
  { path: "/favorites", name: "favorites", component: Favorites },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
