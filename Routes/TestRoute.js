const {
	creatingTest,
	getAllTest,
	CreateQuestions,
} = require("../Contoller/TestController");
const express = require("express");
const router = express.Router();

router.route("/createTest").post(creatingTest);
router.route("/viewTest").get(getAllTest);
router.route("/:id/create-questions").post(CreateQuestions);

module.exports = router;
