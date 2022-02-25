const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('db_school', 'root', '123123', {
    host: '127.0.0.1',
    port: '3306',
    dialect: 'mysql',
    timezone: '+08:00',
    logging: false,
    pool: {
        max: 10,
    },
    define: {
        timestamps: false,
    },
    // 将查询出来的国际标准时间转换成东八区时间, dateStrings, typeCast缺一不可
    dialectOptions: {
        dateStrings: true,
        typeCast: true
    },
});
module.exports = sequelize;
