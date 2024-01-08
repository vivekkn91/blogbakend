// ../server/routers/users.js
const express = require("express");
const {
  addblog,
  getBlogs,
  editSingleBlog,
  getSingleBlog,
} = require("../controller/blogs");
const AuthJWT = require("../middleware/auth");
const router = express.Router();

router.post("/blog/add", AuthJWT, addblog);
router.get("/blog/show", getBlogs);
router.get("/blognew/:id", getSingleBlog);

router.put("/blog/:id", AuthJWT, editSingleBlog);
module.exports = router;
