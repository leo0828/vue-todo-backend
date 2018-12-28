const moment = require('moment');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('todo', {
        // 待办事项ID
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        // 待办事项内容
        text: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'text',
        },
        // 待办事项是否完成
        done: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            field: 'done',
        },
        createdAt: {
            type: DataTypes.DATE,
            get() {
                return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD');
            }
        },
        updatedAt: {
            type: DataTypes.DATE,
            get() {
                return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD');
            }
        }
    }, {
        // 如果为 true 则表的名称和 model 相同，即 user
        // 为 false MySQL创建的表名称会是复数 users
        // 如果指定的表名称本就是复数形式则不变
        freezeTableName: false
    })

}