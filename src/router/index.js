import { createRouter, createWebHistory } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Home from "../views/Home";
import Form from "../views/Form";
import Investment from "../views/Investment";
import Dashboard from "../views/Dashboard";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";

const router = createRouter({
  // mode: "hash",
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/future-planning",
      name: "Form",
      component: Form,
    },
    {
      path: "/investments",
      name: "Investment",
      component: Investment,
    },
    {
      path: "/signup",
      name: "Signup",
      component: Signup,
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: Dashboard,
      meta: { requiresAuth: true },
    },
    // {
    //   path: "/your-investment",
    //   name: "Investment",
    //   component: Investment,
    //   meta: { requiresAuth: true },
    // },
  ],
});

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
};

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next();
    } else {
      alert("You must be logged in to view this page");
      next("/login");
    }
  } else {
    next();
  }
});

export default router;
