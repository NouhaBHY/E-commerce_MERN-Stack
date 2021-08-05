const User = require('../models/user');
const jwt = require('jsonwebtoken'); 


exports.signup = (req, res) => {


    User.findOne({ email: req.body.email })
    .exec((error, user) => {
        if(user) return res.status(400).json({ // usser exist
            message: 'User already registred'
        });
        const {         //if user don't exists : then create obj from req data
            firstName,  //signup process : from the  request
            lastName,
            email,
            password
        } = req.body;
        const _user = new User({
            firstName,
            lastName,
            email,
            password,
            userName: Math.random().toString()
        });
        _user.save((error, data) => { //after creating user : check one more time
            if(error){
                return res.status(400).json({
                    message: 'Something went wrong'
                });            
            }
            if(data){
                return res.status(201).json({      //req created & user created
                    //message: 'User created Successfully ..!'
                    message: 'created!'
                })
            }
        });
    });
}
exports.signin = (req, res) => {
    User.findOne({ email: req.body.email}) //find user
    .exec((error, user) => {// you get error or user
        if(error) return res.status(400).json({ error});
        if(user) {

            if (user.authenticate(req.body.password)) {//function in our model compare password
                //if return true
                 //create token 
                const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, { expiresIn: '1h' });
                const { _id, firstName, lastName, email, role, fullName } = user;
                res.status(200).json({
                    token,
                    user: {
                        _id, firstName, lastName, email, role, fullName
                    }
                });
            }else{
                return res.status(400).json({
                    message: 'Invalid Password'
                })    
            }
        }else { 
            return res.status(400).json({ message: 'something went wrong!'});
        }
    });
}


