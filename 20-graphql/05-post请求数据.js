const axios = require('axios');

const queryData = JSON.stringify({
  // 传递的字符串不能使用''
  query: `{
    getStudent(id: 1) {
      name
      age
      sex
      money(city: "濮阳")
    }
  }`,
});

axios({
  method: 'post',
  url: 'http://127.0.0.1:3000/graphql',
  headers: {
    'Content-Type': 'application/json',
  },
  data: queryData,
}).then((res) => console.log(res.data));
