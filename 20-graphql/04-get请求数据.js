const axios = require('axios');
const { URL } = require('url');

const url1 = new URL('http://127.0.0.1:3000/graphql?query={getStudent(id: 1){name age sex money(city: "深圳")}}');
axios.get(url1.href).then((respose) => console.log(respose.data));
