const User = require('../models/user');

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

