const models = require("../../models/skills/skill");
const {upload, cloudinary} = require("../imgsUploads/upload");

exports.getAllskills = async (req, res, next) => {
    try {
        const admin = await models.getAllskills();
        res.json({success: true, data: admin});
    } catch (err) {
        return next(err);
    }
}

exports.getDistinctskill = async (req, res, next) => {
    try {
        const admin = await models.getDistinctskill();
        res.json({success: true, data: admin});
    } catch (err) {
        return next(err);
    }
}
 
exports.oneSkill = async (req, res, next) => {
    try {
        const admin = await models.oneSkill(req.params.name);
        res.json({success: true, data: admin});
    } catch (err) { 
        return next(err);
    }
}

exports.oneSkillId = async (req, res, next) => {
    try {
        const admin = await models.oneSkillId(req.params.skill_id);
        console.log(admin);
        res.json({success: true, data: admin});
    } catch (err) { 
        return next(err);
    }
}

exports.oneEntreprenuerSkill = async (req, res, next) => {
    try {
        const entreprenuerSkill = await models.oneEntreprenuerSkill(req.params.entreprenuer_id);
        res.json({success: true, data: entreprenuerSkill});
    } catch (err) { 
        return next(err);
    }
}

exports.addSkill = async (req, res, next) => {
    try {
        const img = req.file;
        try {
            var result = await cloudinary.uploader.upload(`${img.path}`, {folder: "tradecrafts"})
            // console.log({message: "image uploaded successfully!"}); 
        } catch (error) {
            return error;
        }                                                                                           
        
        const user = await models.addSkill([req.body.name, req.body.location, req.body.price, req.body.description, req.body.start_date, req.body.period,  result.public_id, result.secure_url, req.params.entreprenuer_id]);
        // const user = await models.addSkill([req.body.name, req.body.location, req.body.price, req.body.description, req.body.start_date, req.body.period, req.body.public_id, req.body.skill_url, req.params.entreprenuer_id]);
        // console.log(user);
        res.json({data: user});
    } catch (err) {
        return next(err);
    }
}

exports.updateSkill = async (req, res, next) => {
    try {
        // const img = req.file;
        // try {
        //     var result = await cloudinary.uploader.upload(`${img.path}`, {folder: "tradecrafts"})
        //     console.log({message: "image uploaded successfully!"}); 
        // } catch (error) {
        //     return error;
        // }                                                                                                                                                   result.public_id, result.secure_url,

        const user = await models.updateSkill( [req.body.name, req.body.location, req.body.price, req.body.description, req.body.start_date, req.body.period, req.body.public_id, req.body.skill_url, req.params.entreprenuer_id, req.body.entreprenuer_id] );
        // console.log(user);
        res.json({data: user});
    } catch (err) {
        return next(err);
    }
}

exports.deleteSkill = async (req, res, next) => {
    try {
        const user = await models.deleteSkill(req.params.skill_id, req.params.entreprenuer_id);
        res.json({ data: user });
    } catch (err) {
        return next(err);
    }
}