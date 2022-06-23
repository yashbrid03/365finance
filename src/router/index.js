import { createRouter, createWebHistory } from "vue-router";

import Home from "../components/Home";
import Form from "../components/Form";
import Investment from "../components/Investment";

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
  ],
});

export default router;
