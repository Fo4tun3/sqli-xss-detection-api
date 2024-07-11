const db = require("../../db");

exports.getAllEmails = async () => {
    try {
        const user = await db.query("SELECT * FROM subscription_emails");
        return user.rows
    } catch (err) {
        return err;
    }
}

exports.getOneEmail = async (email) => {
    try {
        const user = await db.query("SELECT * FROM subscription_emails WHERE email ILIKE $1", [email+'%']);
        return user.rows
    } catch (err) {
        return err;
    }
}

exports.addEmail = async (data) => {
    try {
        const checkemail = await db.query("SELECT email FROM subscription_emails WHERE email=$1", [data]);
        // console.log(checkemail.rows);
        if (checkemail.rows.length > 0) {
            return {success: false, message: "Email already exists"};
        } else {
            const user = await db.query("INSERT INTO subscription_emails (email) VALUES ($1) RETURNING *", [data]);
            return {success: true, message: 'Email added successfully', data: user.rows[0]};
        }
    } catch (err) {
        return err;
    }
}

exports.updateEmail = async (data) => {
    try {
        const user = await db.query("UPDATE subscription_emails SET email = ($1) WHERE email ILIKE $2 RETURNING *", data);
        return {success: true, message: 'Email updated successfully', data: user.rows[0]};
    } catch (err) {
        return err;
    }
}

exports.deleteEmail = async (email) => {
    try {
        const user = await db.query("DELETE FROM subscription_emails WHERE email = $1 RETURNING *", [email]);
        if (user.rows.length === 0) {
            return {success: false, message: "Email does not exists!!"}
        }
        return {success: true, message: "Email Deleted Successfully!!", data: user.rows};
    } catch (err) {
        return err;
    }
}
