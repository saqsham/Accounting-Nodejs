const express = require('express');
const router = express.Router();
const User = require('../models/user')

router.post('/register', function (req, res, next) {
	User.findOne({registerUsername: req.body.registerUsername}, function(err, user){
		if (err) {
			console.log(err);
		}
		if (user) {
			res.render('./pages/register', {regisForm: "Error: user already exists"}); // this works
			// res.redirect(301, '../register', {regisForm: "Error: user already exists"}); // doesn not works
			// res.redirect(301, '..register');
		} else {
			User.findOne({registerEmail: req.body.registerEmail}, function(err, mail){
				if (err) {
					console.log(err);
				}
				if (mail) {
					res.render('./pages/register', {regisForm: "Error: mail already registered"});
				} else {
					const userData = {
						registerEmail: req.body.registerEmail,
						registerUsername: req.body.registerUsername,
						registerPassword: req.body.registerPassword,
					}
					
					User.create(userData, function (error, user) {
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
		User.authenticate(req.body.loginUsername, req.body.loginPassword, function (error, user) {
			if (error || !user) {
				res.render('./pages/login', {loginForm: "Error: Wrong email or passwaord"});
			} else {
				req.session.userId = user._id;
				User.findById(req.session.userId)
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