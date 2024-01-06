const ExistingUser = require('../models/user'); 

const loginRoute = require('../routes/login');

const path = require('path');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

function isstringinvalid(string){
    if(string == undefined ||string.length === 0){
        return true
    } else {
        return false
    }
}

function generateAccessToken(id, name){
    return jwt.sign({id:id, name:name}, 'secretkey');
}

exports.getLoginForm = async (req, res) => {
  res.sendFile(path.join(__dirname, '../', 'views', 'login.html'));
};

exports.addLoginDetails = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if(isstringinvalid(email) || isstringinvalid(password)){
            return res.status(400).json({message: 'EMail id or password is missing ', success: false})
        }
        //console.log(password);

        // Check if the user with the given email exists
        const user = await ExistingUser.findAll({ where: { email: email } });

        console.log(user);

        if(user.length > 0)
        {
            bcrypt.compare(password, user[0].password, (err, result) => {
                if(err){
                    throw new Error('Something went wrong');
                }
                if(result === true){
                    return res.status(200).json({success:true, message: "User logged in successfully", token:generateAccessToken(user[0].id, user[0].name)});

                }
                else{
                    return res.status(400).json({success: false, message: 'Password is incorrect'})
                }
            })
        }
        else 
        {
            return res.status(404).json({success: false, message: 'User Doesnot exitst'})
        }

    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
