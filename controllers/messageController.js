var Message = require('../models/message');

const { body, validationResult } = require("express-validator");

exports.index = (req, res, next) => {
    Message.find({})
    .populate('user')
    .exec(function (err, messages) {
        if (err) {return next(err); }

        res.render('index', {title: 'Welcome', message_list: messages})
    });
};

exports.message_create_get = (req, res) => {
    res.render('post', {header: 'Create Message'});
};

exports.message_create_post = [
    //sanatize data for message, only need Title and text from user
    body('title', 'Title Must be Provided').trim().isLength({ min: 1 }).escape(),
    body('text', 'Please Type a Message').trim().isLength({ min: 1 }).escape(),

    (req, res, next) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            res.render('post', { title: 'Create Message', message: req.body, errors: errors.array() });
        }
        let current = new Date();


        var message = new Message({
            title: req.body.title,
            // timestamp: current.toLocaleString(),
            text: req.body.text,
            user: req.user._id
        });

        message.save(function(err) {
            if (err) {return next(err); };

            res.redirect('/');
        });




    },
];

