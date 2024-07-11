const express = require("express");
const router = express.Router();
const imgUpload = require("../../controllers/imgsUploads/upload");
const { getAllproducts, getDistinctproduct, oneproduct, oneproductId, oneUserproduct, addproduct, updateproduct, deleteproduct } = require("../../controllers/products/products");


router.get("/", getAllproducts);

router.get("/distinct", getDistinctproduct);

router.get("/:name", oneproduct);

router.get("/one-product/:product_id", oneproductId);

router.get("/user/:user_id", oneUserproduct);

router.post("/:user_id", imgUpload.upload.single('avatar'), addproduct)

router.patch("/update-product/user=:user_id/id=product_id", updateproduct);

router.delete("/delete/user=:user_id/id=:product_id", deleteproduct);

module.exports = router;

