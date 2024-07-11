const express = require("express");
const router = express.Router();
const { getallUser, getUser, getUserByAny, registerUser, deleteUser, checkoldPassword, patchBuyerPassword, getUserById, getUserByName, checkTestDB} = require("../../controllers/auth/register");

router.get("/users", getallUser);

router.get("/users/email/:email", getUser);

router.get("/users/id/:customerid/:userid", getUserById);

router.get("/users/name/:name", getUserByName);

router.get("/users/any/:anysearch/:userid", getUserByAny);

router.post("/register", registerUser);

router.delete("/delete-account/:email", deleteUser);



router.post("/oldpassword/:email", checkoldPassword);

router.patch("/password-change/:email", patchBuyerPassword);

router.get("/testdb", checkTestDB);


module.exports = router;
