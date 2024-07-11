const db = require("../../db");

exports.checkUserExists = async (data) => {
    try {
        const user = await db.query("SELECT * FROM users WHERE email = ?", [data[0]]);
        
        if (user[0].length === 0) {
            return {message: 'User does not Exists!', message: "Invalid Email" };
        } else {            
            return {message: 'User Exists!', userData: user[0]};
        }            
    } catch (err) {
        return err;
    }
}

exports.trueLogin_logs = "INSERT INTO login_logs (user_id, username, success) VALUES ($1, $2, $3) RETURNING *"
exports.falseLogin_logs = "INSERT INTO login_logs (user_id, username, success, provided_password) VALUES ($1, $2, $3, $4) RETURNING *"

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

