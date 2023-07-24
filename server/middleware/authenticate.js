const jwt = require('jsonwebtoken')
const AuthController = require('../controllers/AuthController');
const User = require('../models/User')

const authenticate = (req, res, next) => {
    try {
        console.log("PING")
        const accessToken = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)


        const { name } = decode;
        User.findOne({ name }).then(user => {
            if (!user) {
                return res.status(401).json({ message: 'User not found' });
            }

            req.userId = user._id; // Store the user's _id in the request object for further use

            next()
        }).catch(err => {
            return res.status(500).json({ message: 'Internal Server Error' });
        });

    }
    catch (error) {
        if (error.name === "TokenExpiredError") {
            const refreshToken = req.headers['x-refresh-token'];
            if (!refreshToken) {
                return res.status(401).json({ message: 'Refresh token not provided' });
            }

            try {
                // Attempt to refresh the access token
                AuthController.refreshToken(req, res, next); // Call the refreshToken function
            } catch (refreshError) {
                // Handle the refresh token error
                res.status(401).json({ message: 'Token refresh failed', error: refreshError.message });
            }

        } else {
            res.status(401).json({ message: 'Authentication Failed!' }); // Return a JSON response indicating authentication failure
        }

        // Or, if you prefer to redirect the user using the client-side router:
        // res.redirect('/login'); // Redirect the user to the login page
    }
}

module.exports = authenticate 