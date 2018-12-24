const router = require('koa-router')()
const fs = require('fs');

var myTodos = require('../todos.json')

router.prefix('/todos')

var idCount = Math.max(...myTodos.map(o => o.id));//当前id，新增todo成功后自增
console.log('idCount:',idCount);

var updateTodosFile = (str) => {
    fs.writeFile('./todos.json', str, function (err) {
        if (err) {
            throw err;
        }
        console.log('----------更新todo.json文件成功-------------');
        fs.readFile('./todos.json', function (err, data) {
            if (err) {
                throw err;
            }
            console.log(data.toString());
        });
    })
}

router.get('/', function (ctx, next) {//获取所有todo
    ctx.body = myTodos
})

router.post('/', function (ctx, next) {//新增单个todo
    let todo = ctx.request.body
    idCount++
    todo.id = idCount
    myTodos.push(ctx.request.body)
    updateTodosFile(JSON.stringify(myTodos));
    ctx.body = todo
})

router.delete('/:id', function (ctx, next) {//删除单个todo
    console.log(ctx.params);
    let id = ctx.params.id;
    let index = myTodos.findIndex(i => i.id == id);

    if (index < 0) {
        ctx.body = "cant find todo with id = " + id
    } else {
        myTodos.splice(index, 1)
        updateTodosFile(JSON.stringify(myTodos));
        ctx.body = 'deleted todos id:' + id
    }
})

router.put('/:id', function (ctx, next) {//修改单个todo
    console.log(ctx.params);
    console.log(ctx.request.body);
    let id = ctx.params.id,
        newTodo = ctx.request.body;
    let todo = myTodos.find(o => o.id == id);
    todo = JSON.parse(JSON.stringify(Object.assign(todo, newTodo))) //用newTodo合并todo，深拷贝后再赋值，避免内存泄漏
    updateTodosFile(JSON.stringify(myTodos));
    ctx.body = todo
})

router.post('/delete', function (ctx, next) {//删除多个todo
    let ids = ctx.request.body.ids;
    myTodos = myTodos.filter(todo => ids.indexOf(todo.id) < 0)
    updateTodosFile(JSON.stringify(myTodos));
    ctx.body = 'delete todos success'
})

module.exports = router