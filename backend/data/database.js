const mongoose = require("mongoose");


const connectDB = () =>{
    mongoose.connect("mongodb+srv://soourabh:Sourabh@cluster0.gywogyh.mongodb.net/atgworld").then(()=> {
        console.log("Connected to MongoDB database")
    }).catch((err) =>{
        console.log(err)
    });
}

module.exports = connectDB