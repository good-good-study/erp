import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../layout/MainLayout.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/',
      component: MainLayout,
      redirect: '/dashboard/analysis',
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          redirect: '/dashboard/analysis',
          children: [
            {
              path: 'analysis',
              name: 'analysis',
              component: () => import('../views/dashboard/Analysis.vue')
            },
            {
              path: 'workplace',
              name: 'workplace',
              component: () => import('../views/dashboard/Workplace.vue')
            }
          ]
        },
        {
          path: 'inventory',
          name: 'inventory',
          redirect: '/inventory/stock',
          children: [
            {
              path: 'stock',
              name: 'stock',
              component: () => import('../views/inventory/Stock.vue')
            },
            {
              path: 'in-out',
              name: 'in-out',
              component: () => import('../views/inventory/InOut.vue')
            }
          ]
        },
        {
          path: 'employee',
          name: 'employee',
          redirect: '/employee/list',
          children: [
            {
              path: 'list',
              name: 'employee-list',
              component: () => import('../views/employee/List.vue')
            },
            {
              path: 'roles',
              name: 'employee-roles',
              component: () => import('../views/employee/Roles.vue')
            }
          ]
        },
        {
          path: 'resources',
          name: 'resources',
          redirect: '/resources/files',
          children: [
            {
              path: 'files',
              name: 'resource-files',
              component: () => import('../views/resources/Files.vue')
            },
            {
              path: 'groups',
              name: 'resource-groups',
              component: () => import('../views/resources/Groups.vue')
            }
          ]
        },
        {
          path: 'profile',
          name: 'profile',
          component: () => import('../views/profile/Index.vue')
        }
      ]
    }
  ]
})

export default router