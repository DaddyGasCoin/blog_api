var express = require('express');
var router = express.Router();
const passport = require('passport');
const jwtStrategry = require("../passport")
const decode = require('../decodeToken')
const user_controller = require('../controllers/userController')
const comment_controller = require('../controllers/commentController')
const post_controller = require('../controllers/postController')

passport.use(jwtStrategry);
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  const token = decode.decode(bearerHeader)
  if (token.admin) {
    next()
  }
  // Forbidden
  else {
    res.sendStatus(401);
  }
}

/// POSTS ROUTES ///

// GET request for all posts
router.get("/posts", post_controller.post_list);
// POST request for creating a post.
router.post("/post/create", passport.authenticate('jwt', { session: false }),
  post_controller.post_create_post);
// // POST request to delete post.
router.post("/post/:id/delete", verifyToken, post_controller.post_delete_post);
// // POST request to update post.
router.post("/post/:id/update", post_controller.post_update_post);
// // GET request to view a post
router.get("/post/:id", post_controller.post_detail);


// /// User ROUTES ///

// // GET request for creating user.
router.post("/user/create", user_controller.user_create_post);
//POST Request for user login
router.post("/user/login", user_controller.user_login_post);
// // GET request to get user's details
router.get("/user/:id/details", user_controller.user_detail);

// /// COMMENT ROUTES ///

// //POST request for creating comment.
router.post("/comment/:id/create", passport.authenticate('jwt', { session: false }),
  comment_controller.comment_create_post);
// // POST request to delete comment
router.post("/comment/:id/delete", verifyToken, comment_controller.comment_delete_post);

// //GET request to get all comments
router.get("/comments/", comment_controller.comment_list)


module.exports = router;
