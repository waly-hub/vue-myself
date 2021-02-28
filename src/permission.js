import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { message } from 'ant-design-vue'
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/member/login', '/auth-redirect'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/member/login') {
      console.log('登录页面');
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done() // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      console.log(store.state.user.roles);
      // const hasRoles = store.getters.roles && store.getters.roles.length > 0
      const hasRoles = store.state.user.roles && store.state.user.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          console.log('xx');
          // get user info
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          const { data } = await store.dispatch('user/getInfo')
          const { roles } = data
          // generate accessible routes map based on roles
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
          // console.log('accessRoutes', accessRoutes);
          // dynamically add accessible routes
          router.addRoutes(accessRoutes)
          // console.log(router);
          // console.log('to', to);
          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
          // next()
        } catch (error) {
          // remove token and go to login page to re-login
          // await store.dispatch('user/resetToken')
          // message.warning(error || 'Has Error')
          // next(`/member/login?redirect=${to.path}`)
          // NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      console.log('白名单');
      // in the free login whitelist, go directly
      next()
    } else {
      console.log('to', to);
      // other pages that do not have permission to access are redirected to the login page.
      next(`/member/login?redirect=${to.path}`)
      console.log('yyy');
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
