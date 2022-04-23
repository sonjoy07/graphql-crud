var express = require('express');
var { graphqlHTTP } = require('express-graphql');
const schema = require('./schema')
const connectDB = require('./connections');
const { default: mongoose } = require('mongoose');

connectDB();


var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));

mongoose.connection.once('open',()=>{
    console.log('conneted to database');
    app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));
})