const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const register = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
    if (err) {

      res.status(500).json({ message: err.message });
    }
    var username = req.body.username;
    var email = req.body.email;



    User.findOne({ $or: [{ email: email }, { name: username }] })
      .then(user => {

        if (user && (user.name === username)) {
          res.status(404).json({ message: 'Username: ' + user.name + ' Already Exists!' });
        } else if (user && (user.email === email)) {
          res.status(404).json({ message: 'Email: ' + user.email + ' Already Exists!' });
        } else {

          let user = new User({
            name: username,
            email: email,
            password: hashedPass
          });

          user.save()
            .then(user => {
              res.status(200).json({ message: 'User Registration Successful!' });
            })
            .catch(error => {

              res.status(500).json({ message: error.message });
            });
        }
      })

  });
};

const login = (req, res, next) => {
  var email = req.body.email;
  var password = req.body.password;

  User.findOne({ $or: [{ email: email }, { name: email }] })
    .then(user => {
      if (user) {
        bcrypt.compare(password, user.password, function (err, result) {
          if (err) {
            res.status(400).json({ error: 'Error comparing passwords.' });
          }
          if (result) {
            let accessToken = jwt.sign({ name: user.name }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME });
            let refreshToken = jwt.sign({ name: user.name }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME });
            let username = user.name;
            let userId = user._id;
            res.status(200).json({ message: 'Login Successful!', accessToken, refreshToken, username, userId });
          } else {
            res.status(401).json({ message: 'Invalid Password!' });
          }
        });
      } else {
        res.status(404).json({ message: 'User Not Found!' });
      }
    })
    .catch(error => {
      res.status(500).json({ message: 'An Error Has Occurred!' });
    });
};

const refreshAccessToken = (user) => {
  return jwt.sign({ name: user.name }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME });
}

const refreshRefreshToken = user => {
  return jwt.sign({ name: user.name }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRE_TIME });
}
const refreshToken = (req, res, next) => {

  const refreshToken = req.headers['x-refresh-token'];

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, function (err, decode) {
    if (err) {
      res.status(400).json({
        message: 'Invalid Refresh Token ' + refreshToken
      })
    } else {

      const newAccessToken = refreshAccessToken(decode);
      const newRefreshToken = refreshRefreshToken(decode);

      res.locals.accessToken = newAccessToken; // Pass the new access token to the response locals for later use (e.g., in middleware)
      res.status(200).json({
        message: "Token Refreshed Successfully!",
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,

      })
    }
  })
}

module.exports = {
  register,
  login,
  refreshToken
};
