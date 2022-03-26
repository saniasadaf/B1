const express = require('express');
const bodyparser = require('body-parser');

const sequelize = require(".src/utils/db");
const todosRouter = require("./src/resources/todos/todos router");
const userRouter = require("./src/resources/user/user.router");




const app = express();

app.use(bodyparser.json());

app.use("/api/todos", todosRouter);
app.use("/api/user", userRouter);

app.get("/", (req, res) => res.json({message: "hello world"}));

const startServer = () => {
    sequelize.authenticates()
    .then(() => {
        console.log("Database connected!")
        sequelize.sync({force: true});
        
app.listen(4000, () => console.log("port 4000 is listening"));
    }).catch(e => console.log(e))
}

startServer();



