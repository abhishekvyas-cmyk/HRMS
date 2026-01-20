const express = require("express");
const router = express.Router();

const authController = require("./auth.controller");
const auth=require("../../../middleware/auth-handler");
const validate = require("../../../middleware/validate");
const { registerSchema , loginSchema ,refreshSchema } = require("./auth.validator");

router.post("/register",validate(registerSchema),(req, res) => authController.register(req, res));
router.post("/login",validate(loginSchema), (req, res) => authController.login(req, res));
router.post("/refresh",validate(refreshSchema), (req, res) => authController.refreshAccessToken(req, res));
router.post("/logout",auth, (req, res) => authController.logout(req, res));

module.exports = router;