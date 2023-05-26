const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const sendCookie = require("../utils/features");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middlewares/catchAsyncError");
const generateResetToken = require("../utils/resetToken");
const nodemailer = require("nodemailer");


exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, password, confirmPassword, imageUrl } = req.body;

  if (password !== confirmPassword) {
    return next(new ErrorHandler("Please enter the same password", 400));
  }

  // Check if the email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new ErrorHandler("User already exists", 400));
  }

  const user = await User.create({ firstName, lastName, email, password, confirmPassword, imageUrl });

  sendCookie(user, res, "Registered Successfully", 201);
});


exports.loginUser = catchAsyncErrors(async(req,res,next)=> {
    const {email, password} = req.body;

    //checking if user has given password and email both

    if(!email || !password){
        return next(new ErrorHandler("Please Enter Email & password",400))
    }

    const user = await User.findOne({email}).select("+password");

    if(!user)
    return next(new ErrorHandler("Invalid Email or Password",400))

     const isMatch = await bcrypt.compare(password, user.password);

     if(!isMatch)
     return next(new ErrorHandler("Invalid Email or Password",400))

      sendCookie(user,res,`Welcome back ${user.firstName}`,200);
});


exports.forgotPassword = catchAsyncErrors(async(req, res, next)=>{
  
    const { email } = req.body;

    try {
      
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }
  
      
      const token = generateResetToken();
  
      
      user.resetPasswordToken = token;
      user.resetPasswordExpire = Date.now() + 3600000; // Token expiration time (1 hour)
      await user.save();

      const ResetToken = token;
  
      
      const transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user: "sourabhtemp21@gmail.com",
            pass: 'rdjosiulhjwytbxl',
        },
        
      });
  
      const mailOptions = {
        from: 'your_email@example.com',
        to: email,
        subject: 'Password Reset',
        text: `You are receiving this email because you (or someone else) has requested the reset of your password. Please copy the following token into your browser to complete the process: ${ResetToken}`,
      };
  
      await transporter.sendMail(mailOptions);
  
      res.status(200).json({
        success: true,
        message: 'Password reset email sent',
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
      });
    }
});

exports.resetPassword = catchAsyncErrors(async(req,res,next)=>{
     

    const { token, newPassword } = req.body;

  try {
    
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired reset token',
      });
    }

    
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password reset successful',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }

});

exports.getMyProfile = (req, res) => {
  res.status(200).json({
      success:true,
      user: req.user,
  })
};


exports.logoutUser = (req, res) =>{

    res
     .status(200)
     .cookie("token","",{
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV ==="Development" ? false : true,
     })
     .json({
        success:true,
        message:"Logout Successful",
     })
};