// ../server/routers/users.js
const express = require("express");
const { adduser, login, getUserDetail } = require("../controller/users");
const AuthJWT = require("../middleware/auth");
const router = express.Router();

router.post("/user/registerUser", adduser);
router.post("/login/user", login);

router.get("/user", AuthJWT, getUserDetail);

// router.get("/hello", getHello);

module.exports = router;
