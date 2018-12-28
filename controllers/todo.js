const TodoModel = require('../models/todo')
const statusCode = require('../util/status-code')

class todoController {
    /**
     * 创建待办事项
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async create(ctx) {
        let req = ctx.request.body;
        console.log(req);

        if (req.text && typeof (req.done) === 'boolean') {
            try {

                const ret = await TodoModel.createTodo(req);
                const data = await TodoModel.getTodoDetail(ret.id);

                ctx.response.status = 200;
                ctx.body = statusCode.SUCCESS_200('创建待办事项成功', data);

            } catch (err) {
                ctx.response.status = 412;
                ctx.body = statusCode.ERROR_412({
                    msg: '创建失败',
                    err,
                })
            }
        } else {
            ctx.response.status = 412;
            ctx.body = statusCode.ERROR_412({
                msg: '请检查参数！'
            })
        }
    }

    /**
     * 获取待办事项列表
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async list(ctx) {
        let params = ctx.query;
        try {
            const data = await TodoModel.getTodoList(params);
            ctx.response.status = 200;
            ctx.body = statusCode.SUCCESS_200('查询待办事项列表成功！', data)
        } catch (e) {

            ctx.response.status = 412;
            ctx.body = statusCode.ERROR_412(e);
        }
    }

    /**
     * 查询单条待办事项数据
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async detail(ctx) {
        let id = ctx.params.id;

        if (id) {
            try {
                let data = await TodoModel.getTodoDetail(id);
                ctx.response.status = 200;
                ctx.body = statusCode.SUCCESS_200('查询成功！', {
                    data
                });

            } catch (err) {
                ctx.response.status = 412;
                ctx.body = statusCode.ERROR_412({
                    mgs: '查询失败',
                    err,
                })
            }
        } else {
            ctx.response.status = 412;
            ctx.body = statusCode.ERROR_412('待办事项ID必须传');
        }
    }


    /**
     * 删除待办事项数据
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async delete(ctx) {
        let id = ctx.params.id;

        if (id && !isNaN(id)) {
            try {
                await TodoModel.deleteTodo(id);
                ctx.response.status = 200;
                ctx.body = statusCode.SUCCESS_200('删除待办事项成功！');

            } catch (err) {
                ctx.response.status = 200;
                ctx.body = statusCode.SUCCESS_200({
                    msg: '删除失败',
                    err,
                });

            }
        } else {
            ctx.response.status = 412;
            ctx.body = statusCode.ERROR_412('待办事项ID必须传！');
        }
    }

    /**
     * 更新待办事项数据
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async update(ctx) {
        let req = ctx.request.body;
        let id = ctx.params.id;

        if (req) {
            await TodoModel.updateTodo(id, req);
            let data = await TodoModel.getTodoDetail(id);

            ctx.response.status = 200;
            ctx.body = statusCode.SUCCESS_200('更新待办事项成功！', data);
        } else {

            ctx.response.status = 412;
            ctx.body = statusCode.ERROR_412('更新待办事项失败！')
        }
    }
}

module.exports = todoController