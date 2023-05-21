const express = require("express");
const { loginUser, logoutUser, registerUser, forgotPassword, resetPassword, getMyProfile,} = require("../controllers/userController");
const { isAuthenticated } = require("../middlewares/auth");



const router = express.Router();


router.post("/new", registerUser);

router.post("/login", loginUser);

router.get("/logout", logoutUser);

router.get("/me", isAuthenticated, getMyProfile);

router.post("/password/forgot",forgotPassword);

router.put("/password/reset",resetPassword);


module.exports = router;