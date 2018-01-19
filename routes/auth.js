var authRoutes = require('express').Router();
var validator = require('validator');
var User = require('../model/Users');


function validateLoginForm(payload) { 
    const errors = {};
    let isFormValid = true;
    let message = '';
    
    if (!payload || typeof payload.email !== 'string' || payload.email.trim().length === 0) {
        isFormValid = false;
        errors.email = 'Please enter your email address.';
    }
    if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
        isFormValid = false;
        errors.password = 'Please enter your password';
    }
    if (!isFormValid) {
        message = 'There were errors with logging on';
    }
    
    return {
        success: isFormValid,
        message,
        errors
    };
}

authRoutes.post('/login', (req, res, next) => {
    if (req.body.email && req.body.password) {
        User.authenticate(req.body.email, req.body.password, (error, user) => {
            if (error || !user) {
                var err = new Error('Incorrect email or password');
                err.status = 401;
                return next(err);
            } else {
                req.session.userId = user._id;
                return res.redirect('/profile');
            }
        });
    } else {
        var err = new Error('All fields are required');
        err.status = 400;
        return next(err);
    }
});

authRoutes.post('/register', (req, res, next) => {
    if (req.body.password !== req.body.passwordConf) {
        var err = new Error('Passwords do not match.');
        err.status = 400;
        res.send("Passwords must match");
        return next(err);
    }
    console.log(req.body.email);
    console.log(req.body.first_name);
    console.log(req.body.lastName);
    console.log(req.body.password);
    console.log(req.body.passwordConf);
    if (req.body.email &&
        req.body.firstName &&
        req.body.lastName &&
        req.body.password &&
        req.body.passwordConf) {
            var userData = {
                email: req.body.email,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                password: req.body.password
            }
            User.create(userData, (error, user) => {
                if (error) {
                    return next(error);
                } else {
                    req.session.userId = user._id;
                    return res.redirect('/profile');
                }
            });
        } else {
            var err = new Error('Something went wrong');
            err.status = 500;
            res.send('Something went wrong');
            return next(err);
        }
    })    
    .get('/profile', (req, res, next) => {
        User.findById(req.session.userId)
        .exec((error, user) => {
            if (error) {
                return next(error);
            } else {
                if (user === null) {
                    var err = new Error('Not authorized to view this page');
                    err.status = 400;
                    return next(err);
                } else {
                    return res.send('<h1>' + user.username + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>');
                }
            }
        });
    })
    .get('/logout', (req, res, next) => {
        if (req.session) {
            req.session.destroy((err) => {
                if (err) {
                    return next(err);
                } else {
                    return res.redirect('/');
                }
            });
        }
    });
    module.exports = authRoutes;