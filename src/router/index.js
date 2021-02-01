import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout/Layout.vue'

Vue.use(VueRouter)

export const constantRoutes = [
  {
    path: '/member',
    redirect: '/member/login',
    component: () => import('@/layout/LoginLayout.vue'),
    hidden: true,
    children: [
      {
        path: '/member/login',
        component: () => import('@/views/member/login.vue'),
      }
    ]
  },
  {
    path: '/',
    redirect: '/dashboard',
    hidden: true
  },
  {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard' }
      },
    ]
  },
  {
    path: '/page',
    redirect: '/page/index',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/test/page'),
        name: 'TEST PAGE',
        meta: { title: 'TEST PAGE', icon: 'dashboard' }
      }
    ]
  }

]
// addRoutes 新增的路由
// 子路由必须写完整路由，不能省略父路径
// 具体原因未明，留待后面探索。
export const asyncRoutes = [
  {
    path: '/permission',
    component: Layout,
    // component: () => import('@/layout/index.vue'),
    redirect: '/permission/page',
    name: 'Permission',
    meta: { title: 'Permission', icon: 'lock', roles: [ 'admin', 'editor' ] },
    children: [
      {
        path: '/permission/page',
        name: 'Permission Page',
        component: () => import('@/views/permission/page'),
        meta: { title: 'Permission Page', roles: [ 'admin', 'editor' ] },
      },
      {
        path: '/permission/directive',
        name: 'Permission Directive',
        component: () => import('@/views/permission/directive'),
        meta: { title: 'Permission Directive', roles: [ 'admin', 'editor' ] },
      },
      {
        path: '/permission/roles',
        name: 'Permission Roles',
        component: () => import('@/views/permission/roles'),
        meta: { title: 'Permission Roles', roles: [ 'admin' ] },
      }
    ]
  }
]
console.log('---', constantRoutes.concat(asyncRoutes));
const createRoute = () => new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: constantRoutes
})

const router = createRoute()

export const resetRouter = () => {
  const newRouter = createRoute
  router.matcher = newRouter.matcher
}

export default router
