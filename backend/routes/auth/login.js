const express = require("express");
const router = express.Router();
const { loginUser, ensureLoggedIn, ensureLogged, ensureCorrectUser, checkCorrectUser} = require("../../controllers/auth/login")


router.post("/login", loginUser);

router.get("/secret" , ensureLoggedIn, ensureLogged);

router.get("/:username", ensureCorrectUser, checkCorrectUser);

module.exports = router;
