const express = require("express");
const cookieParser = require("cookie-parser")
const userRouter = require("./routes/userRoutes");
const postRouter = require("./routes/postRoutes")
const errorMiddleware = require("./middlewares/error");
const cors = require("cors");


const app = express();


//using middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
      origin:'https://atg-world-working.netlify.app',
      methods:["GET","POST","PUT","DELETE"],
      credentials: true,
    })
);


//using routes
app.use("/api/v1/users",userRouter);
app.use("/api/v1/posts",postRouter);

//using error middleware
app.use(errorMiddleware);


module.exports = app;
