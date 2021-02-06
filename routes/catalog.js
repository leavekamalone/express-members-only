var express = require('express');
var router = express.Router();

var message_controller = require('../controllers/messageController');
var user_controller = require('../controllers/userController');

router.get('/post', message_controller.message_create_get);

router.post('/post', message_controller.message_create_post);

router.get('/sign_up', user_controller.user_create_get);

router.post('/sign_up', user_controller.user_create_post);

router.get('/login', user_controller.user_login_get);

router.post('/login', user_controller.user_login_post);

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// router.get('/secret', user_controller.user_secret_get);

// router.post('/secret', user_controller.user_secret_post);

router.get('/', message_controller.index);


module.exports = router;