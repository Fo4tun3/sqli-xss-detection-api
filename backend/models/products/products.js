const db = require("../../db");

exports.getAllproducts = async () => {
    try {
        const product = await db.query("SELECT * FROM products ORDER BY product_id DESC");
        return product.rows;
    } catch (err) {
        return err;
    }
}

exports.getDistinctproduct = async () => {
    try {
        const product = await db.query("SELECT DISTINCT(name), product_id, price, location, product_url, description FROM products LIMIT 5");
        return product.rows;
    } catch (err) {
        return err;
    }
}

exports.oneproduct = async (name) => {
    try {
        const product = await db.query("SELECT * FROM products WHERE name ILIKE $1", ['%'+name+'%']);
        return product.rows
    } catch (err) {
        return err;
    }
}

exports.oneproductId = async (product_id) => {
    try {
        const product = await db.query("SELECT * from products join users on products.user_id = users.user_id where product_id = $1 order by product_id;", [product_id]);
        return product.rows
    } catch (err) {
        return err;
    }
}

exports.oneUserproduct = async (user_id) => {
    try {
        const product = await db.query("SELECT * FROM products WHERE user_id = $1", [user_id]);
        return product.rows
    } catch (err) {
        return err;
    }
}

exports.addproduct = async (data) => {
    try {
        const checkemail = await db.query("SELECT * FROM users WHERE user_id = $1", [data[6]]);
        // console.log(checkemail);
        const product = await db.query("INSERT INTO products (user_id, name, price, location, description, public_id, product_url) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *", 
            [checkemail.rows[0].user_id, data[0], data[1], data[2], data[3], data[4], data[5]]);
        // console.log(product);
            return {success: true, message: 'product added successfully', data: product.rows[0]};
    } catch (err) {
        return err;
    }
}

exports.updateproduct = async (data) => {
    try {
        const product = await db.query("UPDATE products SET name=($1), price=($2), location=($3) description=($4), WHERE product_id = $5 AND user_id = $6 RETURNING *", data);
        if (product.rows.length === 0) {
            return {success: false, message: "product does not exists!!"};
        }
        return {success: true, message: 'product updated successfully', data: product.rows[0]};
    } catch (err) {
        // console.log(err);
        return err;
    }
}

exports.deleteproduct = async (user_id, product_id) => {
    try {
        // const product = await db.query("UPDATE products SET status=1 WHERE user_id = $1 RETURNING *", [user_id]);
        const product = await db.query("DELETE FROM products WHERE product_id = $1 AND user_id = $2 RETURNING *", [user_id, product_id]);
        if (product.rows.length === 0) {
            return {success: false, message: "product does not exists!!"};
        }
        return {success: true, message: "product Deleted Successfully!!", data: product.rows};
    } catch (err) {
        // console.log(err);
        return err;
    }
}
