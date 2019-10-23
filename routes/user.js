const express = require('express');
const router = express.Router();
const User = require('../models/user')


router.post('/register', async (req, res) => {
    console.log(req.body)
    const user = new User(req.body)
    
    try {
        await user.save()
		//res.status(201).send(user)
		req.session.userId = user._id;
		req.session.name = user.username;
	    return res.redirect('../login')
    } catch (e) {
        res.status(400).send(e)
    }
})


// router.post('/register', function (req, res, next) {
// 	User.findOne({username: req.body.username}, function(err, user){
// 		if (err) {
// 			console.log(err);
// 		}
// 		if (user) {
// 			res.render('./pages/register', {regisForm: "Error: user already exists"}); // this works
// 			// res.redirect(301, '../register', {regisForm: "Error: user already exists"}); // doesn not works
// 			// res.redirect(301, '..register');
// 		} else {
// 			User.findOne({email: req.body.email}, function(err, mail){
// 				if (err) {
// 					console.log(err);
// 				}
// 				if (mail) {
// 					res.render('./pages/register', {regisForm: "Error: mail already registered"});
// 				} else {
// 					const userData = {
// 						email: req.body.email,
// 						username: req.body.username,
// 						password: req.body.password,
// 					}
					
// 					User.create(userData, function (error, user) {
// 						if (error) {
// 							return next(error);
// 						} else {
// 							req.session.userId = user._id;
// 							return res.redirect('../login');
// 						}
// 					});
// 				}
// 			});
// 		}
// 	});

// });

router.post('/login', async function(req, res, next) {
	// if (req.body.email && req.body.password) {
	// 	User.authenticate(req.body.email, req.body.password, function (error, user) {
	// 		if (error || !user) {
	// 			res.render('./pages/login', {loginForm: "Error: Wrong email or passwaord"});
	// 		} else {
	// 			req.session.userId = user._id;
	// 			User.findById(req.session.userId)
	// 				.exec(function (error, user) {
	// 					if (error) {
	// 						return next(error);
	// 					} else {
	// 						return res.render('homepage/home', {userName: user.username})
	// 					}
	// 				});
	// 		}
	// 	});
	// };
	try{
		const user = await User.authenticate(req.body.email,req.body.password)
		req.session.userId = user._id;
		req.session.name = user.username;
		req.session.companyName = '';
		req.session.companyId = '';
		//req.body['userid'] = "test"
		console.log(req.body)
		//console.log(user)
		
		return res.redirect('/home')
		
	}
	catch(e)
	{
		console.log("An error has occured")
	}
});

module.exports = router;