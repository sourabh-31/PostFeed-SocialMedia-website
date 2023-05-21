const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:[true,"First name should not be empty"],
    },
    lastName:{
        type:String,
        required:[true,"Last name should not be empty"],
    },
    email:{
        type:String,
        required:[true,"Email should not be empty"],
        validate:[validator.isEmail,"Please Enter a valid Email"]
    },
    password:{
        type:String,
        required:true,
        select:false,
        min:[8,"Password should be more than 8 characters"]
    },
    confirmPassword:{
        type:String,
        required:true,
        select:false,
        min:[8,"Password should be more than 8 characters"]
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    imageUrl:{
        type:String,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,

});

userSchema.pre("save",async function(next) {
    if(!this.isModified("password")){
        next();
    }

    this.password = await bcrypt.hash(this.password,10)
});

userSchema.pre("save",async function(next) {
    if(!this.isModified("confirmPassword")){
        next();
    }

    this.confirmPassword = await bcrypt.hash(this.confirmPassword,10)
});

//compare password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

module.exports = mongoose.model("User",userSchema);