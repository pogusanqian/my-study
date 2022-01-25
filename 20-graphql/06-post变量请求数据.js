const axios = require('axios');

const queryData = JSON.stringify({
  query: `
  query GetStudent($id: Int!, $cityName: String!){
    getStudent(id: $id) {
      name
      age
      sex
      money(city: $cityName)
    }
  }`,
  variables: {
    id: 2,
    cityName: '深圳',
  },
});

axios({
  method: 'post',
  url: 'http://127.0.0.1:3000/graphql',
  headers: {
    'Content-Type': 'application/json',
  },
  data: queryData,
}).then((res) => console.log(res.data));
