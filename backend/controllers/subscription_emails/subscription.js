const models = require("../../models/subscription_emails/subscription");


exports.getAllEmails = async (req, res, next) => {
    try {
        const user = await models.getAllEmails();
        res.json({success: true, data: user});
    } catch (err) {
        return next(err);
    }
}

exports.getOneEmail = async (req, res, next) => {
    try {
        const user = await models.getOneEmail(req.params.email);
        res.json({success: true, data: user});
    } catch (err) {
        return next(err);
    }
}

exports.addEmail = async (req, res, next) => {
    try {
        const user = await models.addEmail(req.body.email);
        res.json({data: user});
    } catch (err) {
        return next(err);
    }
}

exports.updateEmail = async (req, res, next) => {
    try {
        const user = await models.updateEmail( [req.body.email, req.params.email] );
        res.json({data: user});
    } catch (err) {
        return next(err);
    }
}

exports.deleteEmail = async (req, res, next) => {
    try {
        const user = await models.deleteEmail(req.params.email);
        res.json({ data: user });
    } catch (err) {
        return next(err);
    }
}