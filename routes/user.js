const express = require('express');
const router = express.Router();
const Profile = require('../models/profile')

router.post('/register', function (req, res, next) {
	Profile.findOne({registerUsername: req.body.registerUsername}, function(err, user){
		if (err) {
			console.log(err);
		}
		// var message;
		if (user) {
			res.render('./pages/register', {regisForm: "Error: user already exists"});
		} else {
			Profile.findOne({registerEmail: req.body.registerEmail}, function(err, mail){
				if (err) {
					console.log(err);
				}
				if (mail) {
					res.redirect('../register', {regisForm: "Error: mail already registered"});
				} else {
					const userData = {
						registerEmail: req.body.registerEmail,
						registerUsername: req.body.registerUsername,
						registerPassword: req.body.registerPassword,
					}
					
					Profile.create(userData, function (error, user) {
						if (error) {
							return next(error);
						} else {
							req.session.userId = user._id;
							return res.redirect('../login');
						}
					});
				}
			});
		}
	});

});

router.post('/login', function (req, res, next) {
	if (req.body.loginUsername && req.body.loginPassword) {
		Profile.authenticate(req.body.loginUsername, req.body.loginPassword, function (error, user) {
			if (error || !user) {
				// const err = new Error('Wrong email or password.');
				// err.status = 401;
				// return next(err);
				res.redirect('../login', {loginForm: "Error: Wrong email or passwaord"});

			} else {
				req.session.userId = user._id;
				Profile.findById(req.session.userId)
					.exec(function (error, user) {
						if (error) {
							return next(error);
						} else {
							return res.render('homepage/home', {userName: req.body.loginUsername})
						}
					});
			}
		});
	};
});

module.exports = router;