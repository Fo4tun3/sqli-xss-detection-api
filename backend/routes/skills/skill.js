const express = require("express");
const router = express.Router();
const imgUpload = require("../../controllers/imgsUploads/upload");
const { getAllskills, getDistinctskill, oneSkill, oneSkillId, oneEntreprenuerSkill, addSkill, updateSkill, deleteSkill } = require("../../controllers/skills/skill");


router.get("/", getAllskills);

router.get("/distinct", getDistinctskill);

router.get("/:name", oneSkill);

router.get("/one-skill/:skill_id", oneSkillId);

router.get("/entreprenuer/:entreprenuer_id", oneEntreprenuerSkill);

router.post("/:entreprenuer_id", imgUpload.upload.single('avatar'), addSkill)

router.patch("/update/:entreprenuer_id", updateSkill);

router.delete("/delete/ent=:entreprenuer_id/id:skill_id", deleteSkill);

module.exports = router;

