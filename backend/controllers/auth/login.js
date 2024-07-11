const env = require("dotenv").config();
const db = require("../../db");
const models = require("../../models/auth/login");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
// const SECRET = 'qmwnebrvttcyxuzilokpjahsgdf';
const SECRET = process.env.JWT_SECRET;

exports.loginUser = async (req, res, next) => {
    try {
        const user = await models.checkUserExists([req.body.email, req.body.password]);

        let userPassword = user.userData[0].password;
        let comparePassword = await bcrypt.compare(req.body.password, userPassword)
        let payload = { 
            username: user.userData[0].username, 
            email: user.userData[0].email, 
            role: user.userData[0].role, 
            status: user.userData[0].status
        }
        const token = jsonwebtoken.sign(payload, SECRET , { expiresIn: 60 * 60 } );
        // console.log(user);
        res.json({match: comparePassword, data: user, token});
    } catch (err) {
        return next(err);
    }
}

exports.ensureLoggedIn = function (req, res, next) {
    try {
        const authHeaderValue = req.headers.authorization;
        console.log(authHeaderValue.split(" "));
        const token = jsonwebtoken.verify (authHeaderValue.split(" ")[1], SECRET );
        console.log(token);
        return next();
    } catch (e) {
        return res.status (401).json({ message: "Unauthorized" });
    }
}

exports.ensureLogged = async function (req, res, next) {
    try {
        return res.json({ message: "You made it!" });
    } catch (err) {
        return res.json(err);
    }
}


// helpful middleware to make sure the username stored on the token is the same as the request
exports.ensureCorrectUser = function (req, res, next) {
    try {
        const authHeaderValue= req.headers.authorization;
        const token = jsonwebtoken.verify(authHeaderValue.split(' ')[1], SECRET);
        if (token.username === req.params.email) {
            return next();
        } else {
            return res.status(401).json({ message: "Unauthorized" });
        }
    } catch (e) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}

exports.checkCorrectUser = async function(req, res, next) {
    try {
        return res.json({ message: "You made it!" });
    } catch (err) {
        return res.json(err);
    }
}
