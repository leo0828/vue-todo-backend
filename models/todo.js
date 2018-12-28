const db = require('../config/db');
const Sequelize = db.sequelize;
const Op = Sequelize.Op;
const Todo = Sequelize.import('../schema/todo');

Todo.sync({
    force: false
});

class TodoModel {
    /**
     * 创建代办事项
     * @param data
     * @returns {Promise<*>}
     */
    static async createTodo(data) {
        return await Todo.create({
            text: data.text,
            done: data.done,
        })
    }

    /**
     * 更新代办事项数据
     * @param id  代办事项ID
     * @param data  事项的状态
     * @returns {Promise.<boolean>}
     */
    static async updateTodo(id, data) {
        await Todo.update(data, {
            where: {
                id
            },
            fields: ['text', 'done']
        });
        return true
    }

    /**
     * 获取待办事项列表
     * @returns {Promise<*>}
     */
    static async getTodoList(params) {
        let ret = null;
        let page = parseInt(params.page) || 1,
            pageSize = parseInt(params.pageSize) || 10;

        let config = {
            // 'order': [
            //     ['id', 'DESC'] //按id倒序再查询
            // ]
        }

        if(!!params.page||!!params.pageSize){
            config.limit = pageSize;//每页10条
            config.offset =(page - 1) * pageSize;//起始查询数
        }

        ret = await Todo.findAndCountAll(config);

        return {
            data: ret.rows,
            meta: {
                current_page: parseInt(page),
                per_page: pageSize,
                total: ret.count,
                total_pages: Math.ceil(ret.count / pageSize),
            }
        }
    }

    /**
     * 获取待办事项详情数据
     * @param id  待办事项ID
     * @returns {Promise<Model>}
     */
    static async getTodoDetail(id) {
        return await Todo.findOne({
            where: {
                id
            }
        })
    }

    /**
     * 删除待办事项
     * @param id listID
     * @returns {Promise.<boolean>}
     */
    static async deleteTodo(id) {
        await Todo.destroy({
            where: {
                id
            }
        })
        return true
    }

}

module.exports = TodoModel