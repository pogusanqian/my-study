const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

function getMoney({ city }) {
  return city === '深圳' ? 10000.00 : 3000.00;
}

const data = [
  {
    id: 1,
    name: '张三',
    age: 25,
    money: getMoney,
  },
  {
    id: 2,
    name: '李四',
    age: 25,
    money: getMoney,
  },
];

// graphql有点类似与路由, 找到对应的方法, 返回对应的值; 只不过路由时根据Url进行的路由, graphql是通过参数进行的路由
// 比较难理解的地方就是: 定义的属性可以是function方法
const schema = buildSchema(`
    type Student {
        name: String
        age: Int
        sex: String
        money (city: String): Float
    }
    type Query {
        getStudent(id: Int!): Student
    }
`);

const root = {
  getStudent({ id }) {
    return data.find((item) => item.id === id);
  },
};

const app = express();
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));
app.listen('3000', () => console.log('启动服务成功: 3000'));
