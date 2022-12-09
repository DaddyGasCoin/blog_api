const Comment = require('../models/comment')
require('dotenv').config()
const decode = require('../decodeToken')

exports.comment_create_post = (req, res, next) => {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    const token = decode.decode(bearerHeader)
    const comment = new Comment({
        date: new Date,
        message: req.body.message,
        postID: req.params.id,
        user: token.user
    })
    comment.save((err) => {
        if (err) {
            if (err.errors.postID.kind == 'ObjectId')
                return res.sendStatus(404)
            else {
                res.sendStatus(401)
            }
        }
        else {
            return res.sendStatus(200)
        }
    });

}

//POST request to delete a comment
exports.comment_delete_post = async (req, res, next) => {
    try {
        const comment = await Comment.findByIdAndRemove(req.params.id);

        if (!comment) {
            throw 'Comment not found'
        }
    } catch (error) {
        return res.status(500).send(error);
    }
    return res.sendStatus(200)
}

//List of all comments
exports.comment_list = (req, res) => {
    Comment.find({})
        .exec(function (err, comments) {
            if (err) {
                res.sendStatus(400)
            }
            else {
                res.send({ comments: comments });
            }
        });
};
