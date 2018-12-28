const router = require('koa-router')()

router.prefix('/users')

router.get('/', async (ctx, next) =>{
  
  ctx.body = 'hello'
})

module.exports = router