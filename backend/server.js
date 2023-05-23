const app = require("./app");
const dotenv = require("dotenv");
const connectDB = require("./data/database");

//Handling Uncaught Exception
process.on("uncaughtException",(err)=>{
    console.log(`Error:${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1)
});

//config
dotenv.config({
    path:"backend/data/config.env",
});

//connect to the database
connectDB();

// app.get("/",(req,res)=> {
//     res.send("Working");
// });


app.listen(process.env.PORT, ()=> {
    console.log(`Server is Working on port:${process.env.PORT}`)
});

//unhandled promise rejection
process.on("unhandledRejection", (err)=> {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to unhandled promise rejection`);

    server.close(() =>{
        process.exit(1);
    });
});