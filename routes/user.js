const express = require('express');
const router = express.Router();
const Profile = require('../models/profile')

router.post('/postregister', function (req, res, next) {
	if (req.body.registerEmail &&
		req.body.registerUsername &&
		req.body.registerPassword) {

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

router.post('/home', function (req, res, next) {
	if (req.body.loginUsername && req.body.loginPassword) {
		Profile.authenticate(req.body.loginUsername, req.body.loginPassword, function (error, user) {
			if (error || !user) {
				const err = new Error('Wrong email or password.');
				err.status = 401;
				return next(err);
			} else {
				req.session.userId = user._id;
				Profile.findById(req.session.userId)
					.exec(function (error, user) {
						if (error) {
							return next(error);
						} else {
							if (user === null) {
								const err = new Error('Not authorized!!');
								err.status = 400;
								return next(err);
							} else {
								return res.render('homepage/home', {userName: req.body.loginUsername})
							}
						}
					});
			}
		});
	};
});

module.exports = router;