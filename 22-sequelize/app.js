const DataHubDao = require('./dao/DataHubDao');

(async () => {
  const sql = `select * from t_student limit 10`;
  const res = await DataHubDao.querySql(sql);
  console.log(res)
})();