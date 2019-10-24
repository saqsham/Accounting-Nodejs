const User = require('../models/user')
module.exports.isAuthorized  = async function(req, res, next) {
    
    try{

        const user = await User.findById(req.session.userId).catch(e =>console.log("Unable to login"))
        console.log(user)
        if (user === undefined || user === null) {     
            return res.redirect('../login')
        } else {
            return next();
        }
    }
    catch(e)
    {
        return next(error);
    }
   
}