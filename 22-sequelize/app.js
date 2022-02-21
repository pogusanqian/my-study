const DataHubDao = require('./dao/DataHubDao');

(async () => {
  
  const res = await DataHubDao.querySql(sql);
  console.log(res)
})();