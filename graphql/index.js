const { graphql, buildSchema } = require('graphql')
const schema = buildSchema(`
    type Query {
        hello: String
    }
`);

// 根节点为每个 API 入口端点提供一个 resolver 函数
const root = {
    hello: () => "Hello World"
};

// 运行 GraphQL query '{ hello }' ，输出响应
graphql(schema, "{ hello }", root).then(response => {
    console.log(response)
});
