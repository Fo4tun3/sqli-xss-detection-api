const db = require("../../db");

exports.getAllUsers = async () => {
    try {
        const user = await db.query("SELECT * FROM users");
        return user[0]
    } catch (err) {
        return err;
    }
}

exports.getOneUser = async (email) => {
    try {
        const user = await db.query("SELECT * FROM users WHERE email LIKE ?", ['%'+email+'%']);
        return user[0]
    } catch (err) {
        return err;
    }
}

exports.getOneUserById = async (customerid, userid) => {
    try {
        const user = await db.query("SELECT * FROM users WHERE user_id=? AND user_id=?", [customerid, userid]);
        return user[0]
    } catch (err) {
        return err;
    }
}

exports.getOneUserByName = async (name) => {
    try {
        const user = await db.query("SELECT * FROM users WHERE name LIKE ?", ['%'+name+'%']);
        return user[0]
    } catch (err) {
        return err;
    }
}

exports.getOneUserByAny = async (name, id) => {
    try {
        const user = await db.query("SELECT * FROM users WHERE name LIKE ? OR user_id = ? OR email LIKE ? AND user_id=?", ['%'+name+'%',name,'%'+name+'%', id]);
        return user[0]
    } catch (err) {
        return err;
    }
}

exports.addUser = async (data) => {
    try {
        const checkemail = await db.query("SELECT email FROM users WHERE email=?", [data[1]]);
        if (checkemail[0].length > 0) {
            return {success: false, message: "email already exists"};
        } else {
            const user = await db.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", data);
            if (user[0].affectedRows != 0) {
                return {success: true, message: 'User added Successfully'};
            } else {
                return {success: false, message: 'User not added'};
            }
        }
    } catch (err) {
        return err;
    }
}


exports.deactivateUser = async (email) => {
    try {
        const user = await db.query("UPDATE users SET status=1 WHERE email = $1 RETURNING *", [email]);
        if (user[0].length === 0) {
            return {success: false, message: "User does not exists!!"}
        }
        return {success: true, message: "User Deleted Successfully!!", data: user[0]};
    } catch (err) {
        return err;
    }
}

exports.checkoldPassword = async (email) => {
    try {
        const user = await db.query("SELECT * FROM users WHERE email = $1", [email]);

        if (user[0].length === 0) {
            return res.status(404).send("User not found!")
        }
        return user[0];
    } catch (err) {
        return err;
    }
}

exports.patchBuyerPassword = async (data) => {
    try {
        const passwordUpdate = await db.query("UPDATE users SET password=$1 WHERE email = $2 RETURNING *", data);
        if (passwordUpdate[0].length === 0) {
            return res.status(404).send("User not found!");
        }
        return ({success: true, message: "Password Updated Successfully!!", passwordData: passwordUpdate[0]});
    } catch (err) {
        return err;
    }
}

exports.checkTestDB = async (data) => {
    try {
        const admin = await db.query("SELECT * FROM users");
        
        if (admin[0].length === 0) {
            return {message: 'User does not Exists!', message: "Invalid Email" };
        } else {  
            return {message: 'User Exists!', data: admin[0]};
        }            
    } catch (err) {
        return err;
    }
}