const User = require('../models/user');

const signupRoute = require('../routes/signup');

const path = require('path');

exports.getUserForm = async(req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'signup.html'))
}

exports.addUser = async(req, res, next) => {
    try{
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        const data = await User.create({name:name, email:email, password:password});

        res.status(201).json({newUserDetails:data});
    }catch(err){
        res.status(500).json({error:err});
    }
}

