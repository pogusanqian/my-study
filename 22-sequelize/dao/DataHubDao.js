const { QueryTypes } = require('sequelize');
const sequelize = require('./models');

class DataHubDao {
  /**
   * 原生SQL查询
   * @param {*} sql 
   * @returns 
   */
  static async querySql(sql) {
    return await sequelize.query(sql, { type: QueryTypes.SELECT });
  }

  static async doSql(sql) {
    return await sequelize.query(sql);
  }
}

module.exports = DataHubDao;