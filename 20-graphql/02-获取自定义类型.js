const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const schema = buildSchema(`
    type School {
        name: String
        address: String
    }
    type Student {
        name: String
        age: Int
        sex: String
        money: Float
        friends: [String]
        school: School
    }
    type Query {
        getStudent: Student
    }
`);

const root = {
  getStudent() {
    return {
      name: '张三',
      age: 23,
      sex: '男',
      money: 12.3,
      friends: ['李四', '王五', '赵六'],
      school: {
        name: '河南理工大学',
        address: '焦作市',
      },
    };
  },
};

const app = express();
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));
app.listen('3000', () => console.log('启动服务成功: 3000'));
