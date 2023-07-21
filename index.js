const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app
  .route("/posts")
  .get((req, res) => {
    res.send("all posts");
  })
  .post((req, res) => {
    console.log(req.body);
    res.send(req.body);
  });

app
  .route("/posts/:id")
  .get((req, res) => {
    res.send(req.params);
  })
  .put((req, res) => {
    res.send(`I want to update this post whose id is ${req.params.id}`);
  })
  .delete((req, res) => {
    res.send(`The post with id ${req.params.id} has been deleted`);
  });

app.listen(port, () => {
  console.log("running server");
});
// dPyqJU3BDoHMJjf4
