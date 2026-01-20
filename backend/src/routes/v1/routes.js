const express=require("express");
const router=express.Router();

const authRoutes = require("../../v1/component/auth/auth.routes");
const taskRoutes = require("../../v1/component/task/task.routes");
const userRoutes=require("../../v1/component/user/user.route")

router.use("/auth", authRoutes);
router.use("/user",userRoutes);

module.exports=router;