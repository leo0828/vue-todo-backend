const router = require('koa-router')()
const todoCtrl = require('../controllers/todo')

router.prefix('/todos')

router.get('/', todoCtrl.list)

router.post('/', todoCtrl.create)

router.delete('/:id', todoCtrl.delete)

router.put('/:id', todoCtrl.update)

module.exports = router