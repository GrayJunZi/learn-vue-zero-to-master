import NProgrss from 'nprogress'

export default (router) => {
  router.beforeEach((to, from, next) => {
    NProgrss.start()
    next()
  })
  router.afterEach(NProgrss.done)
}
