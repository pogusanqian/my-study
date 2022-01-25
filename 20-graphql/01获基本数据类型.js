const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const schema = buildSchema(`
    type Query {
        getName: String
        getAge: Int
        getBoolean: Boolean
    }
`);

const root = {
  getName: () => '张三',
  getAge: () => 23,
  getBoolean: () => true,
};

const app = express();
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));
app.listen('3000', () => console.log('启动服务成功: 3000'));
