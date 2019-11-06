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
		req.session.username = user.username;
	    return res.redirect('../login')
    } catch (e) {
        res.status(400).send(e)
    }
})


router.post('/login', async function(req, res, next) {
	
	try{
		console.log(req.body.email,req.body.password)
		const user = await User.authenticate(req.body.email,req.body.password)

		req.session.userId = user._id;
		req.session.username = user.username;
		req.session.companyName = '';
		req.session.companyId = '';
		//req.body['userid'] = "test"
		console.log(req.body)
		//console.log(user)
		
		return res.redirect('/home')
		
	}
	catch(e)
	{
		const data = {loginForm: "try afain"}
		// console.log(data)
		// return res.redirect('/login')
		res.redirect(500, '/login')
		
	}
});

module.exports = router;