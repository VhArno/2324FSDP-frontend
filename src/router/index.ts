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
import { testGuard } from '@/guards/testGuard'
import { resultGuard } from '@/guards/resultGuard'
import { adminGuard } from '@/guards/adminGuard'
import { superadminGuard } from '@/guards/superadminGuard'
import { useAuthStore } from '@/stores/auth'
import AppTest from '@/components/organisms/AppTest.vue'
import AppTestQuestions from '@/components/organisms/AppTestQuestions.vue'
import AppTestResult from '@/components/organisms/AppTestResult.vue'
import AppAdminQuestions from '@/components/organisms/AppAdminQuestions.vue'
import AppAdminResults from '@/components/organisms/AppAdminResults.vue'
import AppAdminAccounts from '@/components/organisms/AppAdminAccounts.vue'
import AppAdminSuggestions from '@/components/organisms/AppAdminSuggestions.vue'
import AppAdminUserSuggestions from '@/components/organisms/AppAdminUserSuggestions.vue'
import { ref } from 'vue'

const autoLoggedIn = ref<boolean>(false)

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
      name: 'testView',
      component: TestView,
      children: [
        {
          path: '',
          name: 'test',
          component: AppTest,
          beforeEnter: [resultGuard]
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
          component: AppTestResult,
          beforeEnter: [testGuard]
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { title: 'Login' },
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
      meta: { requiresAuth: true, role: 'admin', title: 'Adminpanel' },
      beforeEnter: [authGuard, adminGuard],
      children: [
        {
          path: 'questions',
          name: 'adminQuestions',
          component: AppAdminQuestions
        },
        {
          path: 'results',
          name: 'adminResults',
          component: AppAdminResults
        },
        {
          path: 'accounts',
          name: 'adminAccounts',
          component: AppAdminAccounts
        },
        {
          path: 'my-suggestions',
          name: 'adminUserSuggestions',
          component: AppAdminUserSuggestions
        },
        {
          path: 'suggestions',
          name: 'adminSuggestions',
          component: AppAdminSuggestions,
          beforeEnter: [superadminGuard]
        }
      ]
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

router.beforeEach(async (to) => {
  if (!autoLoggedIn.value) {
    await useAuthStore().tryAutoLogin()
    autoLoggedIn.value = true
  }

  if (to.meta.requiresAuth && !useAuthStore().isAuthenticated) {
    return { path: '/login' }
  }

  if (to.meta.role === 'admin' && !useAuthStore().isAdmin) {
    return { path: '/redirect' }
  }
})

export default router
