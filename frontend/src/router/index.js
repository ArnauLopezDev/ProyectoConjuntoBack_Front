import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: "/chat",
      name: "ChatRoom",
      component: () => import("../views/ChatRoomView.vue"),
    },
    {
      path: "/animales",
      name: "animales",
      component: () => import("../views/AnimalsListView.vue"),
    },
    {
      path: "/animales/:animalid",
      name: "animalesIndiv",
      props: true,
      component: () => import("../views/AnimalDetailView.vue"),
    },
    {
      path: "/eventos",
      name: "eventos",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/eventos/:eventid",
      name: "evento",
      props: true,
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/zoologicos",
      name: "zoologicos",
      component: () => import("../views/ZoologicoListView.vue"),
    },
    {
      path: "/zoologicos/:zoologicoid",
      name: "zoologico",
      props: true,
      component: () => import("../views/ZoologicoDetailView.vue"),
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("../views/AboutView.vue"),
    },
  ],
})

export default router
