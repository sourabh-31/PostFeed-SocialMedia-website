const mongoose = require("mongoose");


const connectDB = () =>{
    mongoose.connect(`${process.env.MONGO_URI}/atgworld`).then(()=> {
        console.log("Connected to MongoDB database")
    }).catch((err) =>{
        console.log(err)
    });
}

module.exports = connectDB