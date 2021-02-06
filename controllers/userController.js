var User = require('../models/user');

const { body, validationResult } = require("express-validator");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


var bcrypt = require('bcryptjs');

exports.user_create_get = function(req, res, next) {
    res.render('sign_up', {title: 'Sign Up for Members Only'});
};

exports.user_create_post = [
      // Validate and santise the User Name's fields.
  body('first_name', 'First name required').trim().isLength({ min: 1 }).escape(),
  body('last_name', 'Last name required').trim().isLength({ min: 1 }).escape(),
  body('user_name', 'User Name required').trim().isLength({ min: 3, max: 10 }).escape(),
  body('password', 'Password required').trim().isLength({ min: 6}).escape(),
  body('member_status').optional({ checkFalsy: true }).trim().isLength({ min: 0 }).escape(),
  //password confirmation compares password to password confirmation, ensuring they match before moving on. 
  body('passwordConfirmation', 'Genre name required').trim().isLength({ min: 6, max: 8 }).escape().custom((value, { req }) => {
      if (value !== req.body.password) {
          throw new Error('Password does not much');
      }
      return true;
   }),


   (req, res, next) => {
       const errors = validationResult(req);

       

    
        // collects data from form and adds it to new user object
       var user = new User ({
           first_name: req.body.first_name,
           last_name: req.body.last_name,
           user_name: req.body.user_name,
           password: req.body.password,
           
       })
        //secret message that governs whether person will be able to post messages
       if (req.body.member_status == 'kobebryant') {
           
        user.member_status = true;

     }
     else {
      user.member_status = false;
         
     }

       if (!errors.isEmpty()) {
           res.redirect('/sign_up', {title: 'Sign Up for Members Only', user: req.body, errors: errors.array() });
       }

       User.findOne({ 'user_name': req.body.user_name })
       .exec(function(err,found_user) {
           if (err) {return next(err);}

           if(found_user) {
               res.render('sign_up', {title: 'User Name Exists', user: req.body});
           }
           else {
            //    user.save(function(err) {
            //        if(err) {next(err); }

            //        res.redirect('/');
            //    })

            bcrypt.hash(user.password, 10, (err,hashedPassword) => {
                if (err) {next(err); }

                user.password = hashedPassword;
                user.save(function(err) {
                    if(err) {next(err);}
                    
                    res.redirect('/');
                })
            })
           }


       });
   }

];

exports.user_login_get = function (req, res) {
    res.render('login', {title: 'Login'});
    
;}



exports.user_login_post = ('login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/catalog/login' }));


exports.user_secret_get = function (req, res, next) {
    res.render('secret', {title: 'Do you have the secret message?'});
};

exports.user_secret_post = function (req, res, next) {

}
