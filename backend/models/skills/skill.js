const db = require("../../db");

exports.getAllskills = async () => {
    try {
        const skill = await db.query("SELECT * FROM skills ORDER BY skill_id DESC");
        return skill.rows;
    } catch (err) {
        return err;
    }
}

exports.getDistinctskill = async () => {
    try {
        const skill = await db.query("SELECT DISTINCT(name), skill_id, price, period, skill_url, description FROM skills");
        return skill.rows;
    } catch (err) {
        return err;
    }
}

exports.oneSkill = async (name) => {
    try {
        const skill = await db.query("SELECT * FROM skills WHERE name ILIKE $1", ['%'+name+'%']);
        return skill.rows
    } catch (err) {
        return err;
    }
}

exports.oneSkillId = async (skill_id) => {
    try {
        const skill = await db.query("select * from skills join entreprenuers on skills.entreprenuer_id = entreprenuers.entreprenuer_id where skill_id = $1 order by skill_id;", [skill_id]);
        return skill.rows
    } catch (err) {
        return err;
    }
}

exports.oneEntreprenuerSkill = async (entreprenuer_id) => {
    try {
        const skill = await db.query("SELECT * FROM skills WHERE entreprenuer_id = $1", [entreprenuer_id]);
        return skill.rows
    } catch (err) {
        return err;
    }
}

exports.addSkill = async (data) => {
    try {
        const checkemail = await db.query("SELECT * FROM entreprenuers WHERE entreprenuer_id = $1", [data[8]]);
        // console.log(checkemail);
        const skill = await db.query("INSERT INTO skills (entreprenuer_id, name, location, price, description, start_date, period, public_id, skill_url) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *", 
            [checkemail.rows[0].entreprenuer_id, data[0], data[1], data[2], data[3], data[4], data[5], data[6], data[7]]);
        // console.log(skill);
            return {success: true, message: 'Skill added successfully', data: skill.rows[0]};
    } catch (err) {
        return err;
    }
}

exports.updateSkill = async (data) => {
    try {
        const skill = await db.query("UPDATE skills SET name=($1), location=($2), price=($3), description=($4), start_date=($5), period=($6), public_id=($7), skill_url=($8) WHERE entreprenuer_id = $9 AND skill_id = $10 RETURNING *", data);
        if (skill.rows.length === 0) {
            return {success: false, message: "Skill does not exists!!"};
        }
        return {success: true, message: 'Skill updated successfully', data: skill.rows[0]};
    } catch (err) {
        return err;
    }
}

exports.deleteSkill = async (skill_id, entreprenuer_id) => {
    try {
        // const skill = await db.query("UPDATE skills SET status=1 WHERE entreprenuer_id = $1 RETURNING *", [entreprenuer_id]);
        const skill = await db.query("DELETE FROM skills WHERE skill_id = $1 AND entreprenuer_id = $2 RETURNING *", [skill_id, entreprenuer_id]);
        if (skill.rows.length === 0) {
            return {success: false, message: "skill does not exists!!"};
        }
        return {success: true, message: "skill Deactivated Successfully!!", data: skill.rows};
    } catch (err) {
        return err;
    }
}
