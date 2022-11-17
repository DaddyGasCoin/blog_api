const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const User = require('../models/user');
require('dotenv').config()

//POST request to login user
exports.user_login_post = (req, res, next) => {
    User.findOne({ username: req.body.username }, function (err, user) {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('No user found.');

        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

        var token = jwt.sign({ user: user._id, admin: user.admin }, process.env.secret_key, {
            expiresIn: 86400 // expires in 24 hours
        });

        res.json({ auth: true, token: token });
    });
}
//POST request to create user
exports.user_create_post = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
        if (err) {
            return next(arr)
        }
        const user = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            username: req.body.username,
            password: hashedPassword,
            admin: (Boolean(req.body.admin))
        }).save(err => {
            if (err) {
                if (err.code === 11000)
                    res.status(400).json({ error: 'invalid username' })
                else {
                    res.status(400).json({ error: 'User validation failed' })
                }
            }
            else {
                res.sendStatus(200)
            }
        });
    });

}


exports.user_detail = (req, res, next) => {
    User.findById(req.params.id, 'first_name last_name username')
        .populate('posts')
        .populate('comments')
        .exec(function (err, details) {
            if (err) {
                return next(err)
            }
            res.json(details)
        })
}

