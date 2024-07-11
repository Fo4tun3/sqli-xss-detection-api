const express = require("express");
const router = express.Router();
const { getAllEmails, getOneEmail, addEmail, updateEmail, deleteEmail } = require("../../controllers/subscription_emails/subscription")


router.get("/", getAllEmails);

router.get("/:email", getOneEmail);

router.post("/", addEmail);

router.patch("/update/:email", updateEmail);

router.delete("/delete/:email", deleteEmail);

module.exports = router;

