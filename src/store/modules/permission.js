import { asyncRoutes, constantRoutes } from '@/router'
export function hasPermission (roles, tmp) {
  if (tmp.meta && tmp.meta.roles) {
    return roles.some(role => tmp.meta.roles.includes(role))
  } else {
    return true
  }
}
export function filterAsyncRoutes (routes, roles) {
  console.log(routes, roles);
  const res = []
  routes.forEach(route => {
    let tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}
const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES (state, routes) {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
    console.log('state.routes', state.routes);
  }
}

const actions = {
  generateRoutes ({ commit }, roles) {
    return new Promise((resolve, reject) => {
      let accessedRoutes
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
        console.log('ediotr', accessedRoutes);
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}