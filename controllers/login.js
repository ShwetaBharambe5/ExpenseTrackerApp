const ExistingUser = require('../models/user'); 

const userRoute = require('../routes/login');

const path = require('path');

exports.getLoginForm = async (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'login.html'));
};

exports.addLoginDetails = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Check if the user with the given email exists
    const user = await ExistingUser.findOne({ where: { email: email } });

    if (user && user.password === password) {
      // Successful login
      res.json({ success: true });
    } else {
      // Failed login
      res.json({ success: false });
    }
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
