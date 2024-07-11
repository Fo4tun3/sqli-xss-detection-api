const models = require("../../models/auth/register");
const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.getallUser = async (req, res, next) => {
    try {
        const user = await models.getAllUsers();
        res.json({success: true, data: user});
    } catch (err) {
        return next(err);
    }
}

exports.getUser = async (req, res, next) => {
    try {
        const user = await models.getOneUser(req.params.email);
        res.json({success: true, data: user});
    } catch (err) {
        return next(err);
    }
}
exports.getUserById = async (req, res, next) => {
    try {
        const user = await models.getOneUserById(req.params.customerid, req.params.userid);
        res.json({success: true, data: user});
    } catch (err) {
        return next(err);
    }
}
exports.getUserByName = async (req, res, next) => {
    try {
        const user = await models.getOneUserByName(req.params.name);
        res.json({success: true, data: user});
    } catch (err) {
        return next(err);
    }
}

exports.getUserByAny = async (req, res, next) => {
    try {
        const user = await models.getOneUserByAny(req.params.anysearch, req.params.userid);
        res.json({success: true, data: user});
    } catch (err) {
        return next(err);
    }
}

exports.registerUser = async (req, res, next) => {
    let hashedPassword = await bcrypt.hash(req.body.password, saltRounds)
    try {
        const user = await models.addUser([req.body.name, req.body.email, hashedPassword]);
        res.json({message: 'sucessful', data: user});
    } catch (err) {
        return next(err);
    }
}

exports.deleteUser = async (req, res, next) => {
    try {
        const user = await models.deactivateUser(req.params.email);
        res.json({ data: user });
    } catch (err) {
        return next(err);
    }
}

exports.checkoldPassword = async (req, res, next) => {
    try {
        const user = await models.checkoldPassword(req.params.email);
        let comparePassword = await bcrypt.compare(req.body.oldpassword, user[0].password);
        res.json({match: comparePassword, data: user});
    } catch (err) {
        return next(err);
    }
}
exports.patchBuyerPassword = async (req, res, next) => {
    let hashedPassword = await bcrypt.hash(req.body.newpassword, saltRounds);
    try {
        const user = await models.patchBuyerPassword([hashedPassword, req.params.email]);
        res.json({data: user});
    } catch (err) {
        return next(err);
    }
}


exports.checkTestDB = async (req, res, next) => {
    try {
        const user = await models.checkTestDB();
        res.json({data: user});
    } catch (err) {
        return next(err);
    }
}
