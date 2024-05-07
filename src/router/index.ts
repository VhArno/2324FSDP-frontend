import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/components/pages/HomeView.vue'
import TestView from '@/components/pages/TestView.vue'
import ProfileView from '@/components/pages/ProfileView.vue'
import LoginView from '@/components/pages/LoginView.vue'
import RegisterView from '@/components/pages/RegisterView.vue'
import AdminPanel from '@/components/pages/AdminPanel.vue'
import NotFoundView from '@/components/pages/NotFoundView.vue'
import { authGuard } from '@/guards/authGuard'
import { loginGuard } from '@/guards/loginGuard'
import { adminGuard } from '@/guards/adminGuard'
import { useAuthStore } from '@/stores/auth'
import AppTest from '@/components/organisms/AppTest.vue'
import AppTestQuestions from '@/components/organisms/AppTestQuestions.vue'
import AppTestResult from '@/components/organisms/AppTestResult.vue'

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
      component: TestView,
      children: [
        {
          path: '',
          name: 'testView',
          component: AppTest
        },
        {
          path: 'questions/:id',
          name: 'questions',
          props: true,
          component: AppTestQuestions
        },
        {
          path: 'result',
          name: 'result',
          component: AppTestResult
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      beforeEnter: [loginGuard]
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      beforeEnter: [loginGuard]
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: { requiresAuth: true },
      beforeEnter: [authGuard]
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminPanel,
      meta: { requiresAuth: true, role: 'admin' },
      beforeEnter: [authGuard, adminGuard]
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

router.beforeEach((to) => {
  if (to.meta.requiresAuth && !useAuthStore().isAuthenticated) {
    return { path: '/login' }
  }

  if (to.meta.role === 'admin' && !useAuthStore().isAdmin) {
    return { path: '/redirect' }
  }
})

export default router
