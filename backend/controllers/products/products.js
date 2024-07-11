const models = require("../../models/products/products");
const {upload, cloudinary} = require("../imgsUploads/upload");

exports.getAllproducts = async (req, res, next) => {
    try {
        const products = await models.getAllproducts();
        res.json({success: true, data: products});
    } catch (err) {
        return next(err);
    }
}

exports.getDistinctproduct = async (req, res, next) => {
    try {
        const products = await models.getDistinctproduct();
        res.json({success: true, data: products});
    } catch (err) {
        return next(err);
    }
}
 
exports.oneproduct = async (req, res, next) => {
    try {
        const products = await models.oneproduct(req.params.name);
        res.json({success: true, data: products});
    } catch (err) { 
        return next(err);
    }
}

exports.oneproductId = async (req, res, next) => {
    try {
        const products = await models.oneproductId(Number(req.params.product_id));
        // console.log(products);
        res.json({success: true, data: products});
    } catch (err) { 
        return next(err);
    }
}

exports.oneUserproduct = async (req, res, next) => {
    try {
        const userproduct = await models.oneUserproduct(req.params.user_id);
        res.json({success: true, data: userproduct});
    } catch (err) { 
        return next(err);
    }
}

exports.addproduct = async (req, res, next) => {
    try {
        const img = req.file;
        try {
            var result = await cloudinary.uploader.upload(`${img.path}`, {folder: "tradecrafts"})
            // console.log({message: "image uploaded successfully!"}); 
        } catch (error) {
            return error;
        }                                                                                           
        
        const product = await models.addproduct([req.body.name, req.body.price, req.body.location, req.body.description, result.public_id, result.secure_url, req.params.user_id]);
        // const product = await models.addproduct([req.body.name, req.body.price, req.body.location, req.body.description, req.body.public_id, req.body.product_url, req.params.user_id]);
        // console.log(product);
        res.json({data: product});
    } catch (err) {
        return next(err);
    }
}

exports.updateproduct = async (req, res, next) => {
    try {
        // const img = req.file;
        // try {
        //     var result = await cloudinary.uploader.upload(`${img.path}`, {folder: "tradecrafts"})
        //     console.log({message: "image uploaded successfully!"}); 
        // } catch (error) {
        //     return error;
        // }                                                                                                                                                   result.public_id, result.secure_url,

        const user = await models.updateproduct( [req.body.name, req.body.price, req.body.location, req.body.description, req.params.product_id, req.params.user_id] );
        // console.log(user);
        res.json({data: user});
    } catch (err) {
        // console.log(err);
        return next(err);
    }
}

exports.deleteproduct = async (req, res, next) => {
    try {
        const user = await models.deleteproduct(req.params.user_id, req.params.product_id);
        res.json({ data: user });
    } catch (err) {
        // console.log(err);
        return next(err);
    }
}