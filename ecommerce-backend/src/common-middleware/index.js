
const jwt = require('jsonwebtoken');

exports.requireSignin = (req, res, next) => {
    
    if(req.headers.authorization){//if authorization header not defined
    
        //extract the token == element num 1 of array (bearer token)
        const token = req.headers.authorization.split(" ")[1];
        //decode the code   // get the token in req
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user; //attach user with req
    }else{
        return res.status(400).json({ message: 'Authorizatino required'});
    }
    
    next();
 
    //jwt.decode()
}
exports.userMiddleware = (req,res, next) => {
    if(req.user.role !== 'user'){     //check the role : must be user
        return res.status(400).json({ message: 'User access denied'});
    }
    next();
}
exports.adminMiddleware = (req, res, next) => {
    if(req.user.role !== 'admin'){     //check the role : must be admin
        return res.status(400).json({ message: 'Admin access denied'});
    }
    next();
}