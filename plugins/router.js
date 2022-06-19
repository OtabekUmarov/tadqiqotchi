export default ({app,store}) => {
  app.router.beforeEach((to, from, next) => {
    const access = localStorage.getItem("access")
    const auth_user = localStorage.getItem("auth_user")
    const user_info = JSON.parse(localStorage.getItem("user_info"))
    const role = localStorage.getItem("role")
    store.commit('auth/setState', {key: "auth_user",payload: auth_user})
    store.commit('auth/setState', {key: "access",payload: access})
    store.commit('auth/setState', {key: "role",payload: role})
    store.commit('auth/setState', {key: "user_info",payload: user_info})

    // not logged in


    if(!access && (to.path != '/auth/sign-in')) {
      next('/auth/sign-in')
      return
    }
    // not allowed route
    // if(access && to.meta.roles && !to.meta.roles.includes(role)) {
    //   next('/auth/sign-in')
    //   return
    // }
    // console.log(app.router.options.routes)

    // const isError = !app.router.options.routes.find(el => el.path.toLowerCase() == to.path.toLowerCase())
    // console.log(isError)
    // if(isError) {
    //   next('/auth/sign-in')
    //   return
    // }
    next()
  })
}
