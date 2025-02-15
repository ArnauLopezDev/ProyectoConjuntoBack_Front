// services/auth.service.js
const jwt = require("jsonwebtoken");
const config = require("../config/config.js");

const signToken = (payload) => {
    return jwt.sign(payload, config.AUTH_SECRET_KEY, { expiresIn: config.AUTH_KEY_EXPIRATION });
};

const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, config.AUTH_SECRET_KEY, (err, decoded) => {
            if (err) {
                return reject(err);
            }
            resolve(decoded);
        });
    });
};

module.exports = {
    signToken,
    verifyToken,
};
