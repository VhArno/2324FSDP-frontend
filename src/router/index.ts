import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/components/pages/HomeView.vue'
import TestView from '@/components/pages/TestView.vue'
import QuestionsView from '@/components/pages/QuestionsView.vue'
import ResultsView from '@/components/pages/ResultsView.vue'
import ProfileView from '@/components/pages/ProfileView.vue'
import LoginView from '@/components/pages/LoginView.vue'
import RegisterView from '@/components/pages/RegisterView.vue'
import AdminPanel from '@/components/pages/AdminPanel.vue'
import NotFoundView from '@/components/pages/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/test',
      name: 'test',
      component: TestView
    },
    {
      path: '/questions',
      name: 'questions',
      component: QuestionsView
    },
    {
      path: '/result',
      name: 'result',
      component: ResultsView
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminPanel
    },
    {
      path: '/redirect',
      redirect: {
        name: 'login'
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: NotFoundView
    }
  ]
})

export default router
