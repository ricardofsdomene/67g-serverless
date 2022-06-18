const express = require("express");
const router = express.Router();

const leadController = require("../controller/lead");

router.post("/", leadController.create);
router.get("/", leadController.getUsers);

router.get("/:_id", leadController.getUserById);
router.put("/:_id", leadController.update);

router.delete("/:_id", leadController.delete);
// router.delete("/", leadController.deleteAll);

module.exports = router;
