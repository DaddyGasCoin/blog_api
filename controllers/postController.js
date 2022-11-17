const Post = require('../models/post')
const Comment = require('../models/comment')
require('dotenv').config()
const decode = require('../decodeToken')
const async = require("async");

// Display list of all messages.
exports.post_list = (req, res) => {
    Post.find({})
        .populate({
            path: 'user',
            select: ['username', 'first_name', 'last_name',]
        })
        .exec(function (err, posts) {
            if (err) {
                res.sendStatus(400)
            }
            else {
                res.send({ posts: posts });
            }
        });
};

//POST request to create new post
exports.post_create_post = (req, res) => {
    const bearerHeader = req.headers['authorization'];
    const token = decode.decode(bearerHeader)
    const post = new Post({
        title: req.body.title,
        date: new Date(),
        message: req.body.message,
        user: token.user
    })
    post.save((err) => {
        if (err) {
            console.log(err)
            return res.sendStaus(401)
        }
        else {
            return res.sendStatus(200)
        }
    });

}

//GET request to get data of all posts
exports.post_detail = (req, res) => {
    async.parallel(
        {
            post(callback) {
                Post.findById(req.params.id)
                    .populate('user')
                    .exec(callback)
            },
            commets(callback) {
                Comment.find({ postID: req.params.id })
                    .populate('user')
                    .exec(callback)
            },
        },
        (err, results) => {
            if (err) {
                console.log(err)
                return res.sendStatus(400)
            }
            return res.json(results)
        }
    )
}

//POST request to delete a post
exports.post_delete_post = (req, res) => {
    Post.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            res.sendStatus(400)
        }
        else {
            res.sendStatus(200)
        }
    })
}


//POST request to update a post
exports.post_update_post = (req, res, next) => {

    const post = new Post({
        _id: req.params.id,
        title: req.body.title,
        message: req.body.message,

    })

    Post.findByIdAndUpdate(req.params.id, post, {}, (err, thepost) => {
        if (err) {
            res.sendStatus(400)
        }
        else {
            res.sendStatus(200)
        }
    });
}
