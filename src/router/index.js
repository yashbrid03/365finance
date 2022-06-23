import { createRouter, createWebHashHistory } from "vue-router";

import Home from "../components/Home";
import Form from "../components/Form";
import Investment from "../components/Investment";

const router = createRouter({
  history: createWebHashHistory(),
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
