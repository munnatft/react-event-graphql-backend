const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { graphqlHTTP } = require("express-graphql");

const schema = require("./graphql/schema/index");
const root = require("./graphql/resolver/index");
const auth = require("./middleware/auth");

const app = express();
app.use(bodyParser.json());

app.use(auth)

app.get("/", (req, res, next) => {
  res.send("Graphql with React");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.kikq5ke.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(8082);
  })
  .catch((err) => {
    console.log(err);
  });

