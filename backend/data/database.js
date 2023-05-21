const mongoose = require("mongoose");


const connectDB = () =>{
    mongoose.connect(`${process.env.MONGO_URI}/AtgWorld`).then(()=> {
        console.log("Connected to MongoDB database")
    }).catch((err) =>{
        console.log(err)
    });
}

module.exports = connectDB