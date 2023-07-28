const express = require("express");
const db = require("./config/");
db();


const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
var PORT = 3000;
const app = express();


const contentRouter = require("./router/content");
const error = require("./middleware/error");
const userRouter = require("./router/user");
const categoryRouter = require("./router/category");

app.use(express.json());
app.use("/api/content", contentRouter);

app.use("/api/category", categoryRouter);
app.use("/api/users", userRouter);

app.use(error);
app.listen(3000 ,()=>
{
    console.log(`server ajilla port: ${PORT}`)
})
